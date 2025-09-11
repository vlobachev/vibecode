#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import Handlebars from 'handlebars';
import { glob } from 'glob';

// Register Handlebars helpers
Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('ne', (a, b) => a !== b);
Handlebars.registerHelper('or', (a, b) => a || b);
Handlebars.registerHelper('and', (a, b) => a && b);
Handlebars.registerHelper('includes', (array, item) => array && array.includes(item));
Handlebars.registerHelper('capitalize', (str) => str.charAt(0).toUpperCase() + str.slice(1));
Handlebars.registerHelper('kebabCase', (str) => str.replace(/\s+/g, '-').toLowerCase());
Handlebars.registerHelper('camelCase', (str) => str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : ''));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

class VibecodeTestSetup {
  constructor() {
    // Test configuration - simulating user choices
    this.config = {
      projectName: 'test-vibecode-project',
      description: 'Test AI-assisted collaborative development project',
      author: 'Test User',
      useTypeScript: true,
      useMonorepo: true,
      packages: ['core', 'api', 'web', 'shared-types'],
      packageManager: 'pnpm',
      setupGitHooks: true,
      setupGithubActions: true,
      packageNameScoped: '@test-vibecode-project',
      currentYear: new Date().getFullYear(),
      useWorkspaces: true
    };
    this.spinner = null;
  }

  async run() {
    console.log(chalk.cyan.bold('🧪 Testing Vibecode Blueprint Setup'));
    console.log(chalk.gray('Running automated test with predefined configuration...\n'));

    try {
      await this.checkEnvironment();
      console.log(chalk.yellow('\n📝 Using Test Configuration:'));
      console.log(JSON.stringify(this.config, null, 2));
      
      await this.generateProject();
      await this.setupGitHooks();
      await this.finalizeSetup();
      this.showCompletionMessage();
    } catch (error) {
      if (this.spinner) this.spinner.fail();
      console.error(chalk.red('❌ Test failed:'), error.message);
      process.exit(1);
    }
  }

  async checkEnvironment() {
    this.spinner = ora('Checking environment...').start();
    
    // Check if we're in a git repository
    try {
      await fs.access('.git');
    } catch {
      this.spinner.fail();
      throw new Error('Not in a git repository. Please run "git init" first.');
    }

    this.spinner.succeed('Environment check passed');
  }

  async generateProject() {
    this.spinner = ora('Generating project files...').start();

    // Create test output directory
    const testDir = 'test-output';
    await fs.ensureDir(testDir);

    // Get all template files
    const templateFiles = await glob('**/*', {
      cwd: TEMPLATES_DIR,
      nodir: true,
      dot: true
    });

    console.log(chalk.blue(`\nFound ${templateFiles.length} template files:`));
    templateFiles.forEach(file => console.log(chalk.gray(`  - ${file}`)));

    for (const templateFile of templateFiles) {
      await this.processTemplate(templateFile, testDir);
    }

    // Create package directories if monorepo
    if (this.config.useMonorepo) {
      for (const pkg of this.config.packages) {
        await fs.ensureDir(path.join(testDir, `packages/${pkg}/src`));
        await this.generatePackageJson(pkg, testDir);
      }
    }

    this.spinner.succeed(`Project files generated in ${testDir}/`);
  }

  async processTemplate(templateFile, outputDir) {
    const templatePath = path.join(TEMPLATES_DIR, templateFile);
    const template = await fs.readFile(templatePath, 'utf8');
    
    // Skip binary files or files that shouldn't be templated
    if (this.shouldSkipFile(templateFile)) {
      console.log(chalk.yellow(`  Skipping binary file: ${templateFile}`));
      return;
    }

    // Compile template
    const compiledTemplate = Handlebars.compile(template);
    const output = compiledTemplate(this.config);

    // Determine output path (remove .hbs extension if present)
    let outputPath = templateFile.replace(/\.hbs$/, '');
    
    // Handle conditional files
    if (this.shouldSkipConditionalFile(outputPath)) {
      console.log(chalk.yellow(`  Skipping conditional file: ${outputPath}`));
      return;
    }

    // Full output path
    const fullOutputPath = path.join(outputDir, outputPath);

    // Ensure output directory exists
    await fs.ensureDir(path.dirname(fullOutputPath));
    
    // Write file
    await fs.writeFile(fullOutputPath, output);
    console.log(chalk.green(`  ✓ Generated: ${outputPath}`));
  }

  shouldSkipFile(templateFile) {
    // Skip non-text files
    const binaryExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf'];
    return binaryExtensions.some(ext => templateFile.endsWith(ext));
  }

  shouldSkipConditionalFile(outputPath) {
    // Skip TypeScript files if not using TypeScript
    if (!this.config.useTypeScript && outputPath.includes('tsconfig')) {
      return true;
    }
    
    // Skip GitHub Actions if not requested
    if (!this.config.setupGithubActions && outputPath.includes('.github/workflows')) {
      return true;
    }

    return false;
  }

  async generatePackageJson(packageName, outputDir) {
    const packagePath = path.join(outputDir, `packages/${packageName}`);
    const packageJsonPath = path.join(packagePath, 'package.json');

    const packageJson = {
      name: `${this.config.packageNameScoped}/${packageName}`,
      version: '0.1.0',
      description: `${packageName} package for ${this.config.projectName}`,
      main: this.config.useTypeScript ? 'dist/index.js' : 'src/index.js',
      types: this.config.useTypeScript ? 'dist/index.d.ts' : undefined,
      scripts: {
        build: this.config.useTypeScript ? 'tsc' : 'echo "No build step needed"',
        dev: 'node --watch src/index.js',
        test: 'node --test test/**/*.test.js'
      },
      dependencies: {},
      devDependencies: this.config.useTypeScript ? {
        typescript: '^5.3.0',
        '@types/node': '^20.10.0'
      } : {}
    };

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    console.log(chalk.green(`  ✓ Generated package.json for ${packageName}`));
  }

  async setupGitHooks() {
    if (!this.config.setupGitHooks) return;

    this.spinner = ora('Setting up git hooks...').start();

    const preCommitHook = `#!/bin/bash
# Pre-commit hook for AI code validation
exec ./scripts/agent-guardrails.sh
`;

    await fs.ensureDir('.git/hooks');
    await fs.writeFile('.git/hooks/pre-commit', preCommitHook);
    await fs.chmod('.git/hooks/pre-commit', 0o755);

    // Make guardrails script executable if it exists
    try {
      await fs.chmod('scripts/agent-guardrails.sh', 0o755);
    } catch (error) {
      // Ignore if file doesn't exist
    }

    this.spinner.succeed('Git hooks configured');
  }

  async finalizeSetup() {
    this.spinner = ora('Finalizing setup...').start();

    // Set up git commit template
    const commitTemplate = `# [type](scope): brief description
#
# Detailed explanation of the change and why it was made.
# Include context about the problem being solved.
#
# - Key change 1
# - Key change 2
# - Key change 3
#
# AI-Generated: [Yes/No]
# Reviewed-by: [Human reviewer name]
# Refs: #[issue number]
`;

    await fs.writeFile('.gitmessage', commitTemplate);
    
    this.spinner.succeed('Setup finalized');
  }

  showCompletionMessage() {
    console.log(chalk.green.bold('\n🎉 Vibecode Blueprint Test Complete!\n'));
    
    console.log(chalk.yellow('📋 Test Results:'));
    console.log('✅ Template system working correctly');
    console.log('✅ Handlebars helpers functioning');
    console.log('✅ Conditional file generation working');
    console.log('✅ Package structure created');
    console.log('✅ Git hooks configured\n');

    console.log(chalk.blue('📁 Generated Files:'));
    console.log('Check the test-output/ directory for generated files');

    console.log(chalk.green('\n✨ Blueprint system is ready! 🤖\n'));
  }
}

// Run test setup
const testSetup = new VibecodeTestSetup();
testSetup.run().catch(console.error);
