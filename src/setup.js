#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import Handlebars from 'handlebars';
import { glob } from 'glob';
import validatePackageName from 'validate-npm-package-name';

// Register Handlebars helpers
Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('ne', (a, b) => a !== b);
Handlebars.registerHelper('or', (a, b) => a || b);
Handlebars.registerHelper('and', (a, b) => a && b);
Handlebars.registerHelper('includes', (array, item) => array && array.includes(item));
Handlebars.registerHelper('capitalize', (str) => str.charAt(0).toUpperCase() + str.slice(1));
Handlebars.registerHelper('kebabCase', (str) => str.replace(/\s+/g, '-').toLowerCase());
Handlebars.registerHelper('camelCase', (str) => str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : ''));
Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
  switch (operator) {
    case '==': return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===': return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=': return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==': return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<': return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=': return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>': return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=': return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    default: return options.inverse(this);
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

class VibecodeSetup {
  constructor() {
    this.config = {};
    this.spinner = null;
  }

  async run() {
    console.log(chalk.cyan.bold('🚀 Vibecode Blueprint Setup'));
    console.log(chalk.gray('Setting up your collaborative AI development project...\n'));

    try {
      await this.checkEnvironment();
      await this.gatherUserInput();
      await this.generateProject();
      await this.setupGitHooks();
      await this.finalizeSetup();
      this.showCompletionMessage();
    } catch (error) {
      if (this.spinner) this.spinner.fail();
      console.error(chalk.red('❌ Setup failed:'), error.message);
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

    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    if (majorVersion < 18) {
      this.spinner.fail();
      throw new Error('Node.js 18 or higher is required');
    }

    this.spinner.succeed('Environment check passed');
  }

  async gatherUserInput() {
    console.log(chalk.yellow('\n📝 Project Configuration'));
    
    const questions = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: path.basename(process.cwd()),
        validate: (input) => {
          const result = validatePackageName(input);
          return result.validForNewPackages || result.errors?.[0] || result.warnings?.[0] || true;
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: 'AI-assisted collaborative development project'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author name:',
        default: 'Your Name'
      },
      {
        type: 'confirm',
        name: 'useTypeScript',
        message: 'Use TypeScript?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useMonorepo',
        message: 'Set up as monorepo with workspaces?',
        default: true
      },
      {
        type: 'checkbox',
        name: 'packages',
        message: 'Select packages to create:',
        choices: [
          { name: 'core - Core business logic', value: 'core', checked: true },
          { name: 'api - REST/GraphQL API', value: 'api', checked: true },
          { name: 'web - Frontend application', value: 'web', checked: true },
          { name: 'shared-types - Shared TypeScript types', value: 'shared-types', checked: true },
          { name: 'cli - Command line interface', value: 'cli', checked: false }
        ],
        when: (answers) => answers.useMonorepo
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Package manager:',
        choices: ['pnpm', 'npm', 'yarn'],
        default: 'pnpm'
      },
      {
        type: 'confirm',
        name: 'setupGitHooks',
        message: 'Install pre-commit hooks for AI code validation?',
        default: true
      },
      {
        type: 'confirm',
        name: 'setupGithubActions',
        message: 'Set up GitHub Actions CI/CD?',
        default: true
      }
    ];

    this.config = await inquirer.prompt(questions);
    
    // Set derived values
    this.config.packageNameScoped = `@${this.config.projectName}`;
    this.config.currentYear = new Date().getFullYear();
    this.config.useWorkspaces = this.config.useMonorepo;
    this.config.packages = this.config.packages || [];
  }

  async generateProject() {
    this.spinner = ora('Generating project files...').start();

    // Get all template files
    const templateFiles = await glob('**/*', {
      cwd: TEMPLATES_DIR,
      nodir: true,
      dot: true
    });

    for (const templateFile of templateFiles) {
      await this.processTemplate(templateFile);
    }

    // Create package directories if monorepo
    if (this.config.useMonorepo) {
      for (const pkg of this.config.packages) {
        await fs.ensureDir(`packages/${pkg}/src`);
        await this.generatePackageJson(pkg);
      }
    }

    this.spinner.succeed('Project files generated');
  }

  async processTemplate(templateFile) {
    const templatePath = path.join(TEMPLATES_DIR, templateFile);
    const template = await fs.readFile(templatePath, 'utf8');
    
    // Skip binary files or files that shouldn't be templated
    if (this.shouldSkipFile(templateFile)) {
      return;
    }

    // Compile template
    const compiledTemplate = Handlebars.compile(template);
    const output = compiledTemplate(this.config);

    // Determine output path (remove .hbs extension if present)
    let outputPath = templateFile.replace(/\.hbs$/, '');
    
    // Handle conditional files
    if (this.shouldSkipConditionalFile(outputPath)) {
      return;
    }

    // Ensure output directory exists
    await fs.ensureDir(path.dirname(outputPath));
    
    // Write file
    await fs.writeFile(outputPath, output);
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

  async generatePackageJson(packageName) {
    const packagePath = `packages/${packageName}`;
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

    // Make guardrails script executable
    await fs.chmod('scripts/agent-guardrails.sh', 0o755);

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
    
    // Configure git to use the template
    const { execSync } = await import('child_process');
    try {
      execSync('git config commit.template .gitmessage', { stdio: 'ignore' });
    } catch (error) {
      // Ignore git config errors
    }

    this.spinner.succeed('Setup finalized');
  }

  showCompletionMessage() {
    console.log(chalk.green.bold('\n🎉 Vibecode Blueprint Setup Complete!\n'));
    
    console.log(chalk.yellow('📋 Next Steps:'));
    console.log('1. Install dependencies:', chalk.cyan(`${this.config.packageManager} install`));
    console.log('2. Customize AGENTS.md with your project specifics');
    console.log('3. Review and update the generated configuration files');
    console.log('4. Set up your preferred AI coding assistant');
    console.log('5. Start coding with AI collaboration!\n');

    console.log(chalk.blue('🔧 Quick Commands:'));
    console.log(`- Install deps: ${chalk.cyan(`${this.config.packageManager} install`)}`);
    console.log(`- Run guardrails: ${chalk.cyan(`${this.config.packageManager} run guardrails`)}`);
    console.log(`- Build project: ${chalk.cyan(`${this.config.packageManager} run build`)}`);
    console.log(`- Run tests: ${chalk.cyan(`${this.config.packageManager} run test`)}`);

    console.log(chalk.green('\n✨ Happy vibecoding! 🤖\n'));
  }
}

// Run setup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const setup = new VibecodeSetup();
  setup.run().catch(console.error);
}

export default VibecodeSetup;
