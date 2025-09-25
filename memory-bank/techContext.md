# Technology Context - Vibecode Blueprint

## Core Technologies

### Runtime Environment

- **Node.js 18+**: Modern JavaScript runtime with ES modules support
- **JavaScript (ESM)**: ES2022+ features, native async/await, top-level await
- **Package Manager**: PNPM 8.15.0 for efficient dependency management and workspace support

### Key Dependencies

#### Setup and Templating Engine

- **Handlebars 4.7.8**: Logic-less templating engine for dynamic file generation
- **Inquirer.js 9.2.12**: Interactive command-line user interfaces and prompts
- **fs-extra 11.2.0**: Enhanced file system operations with promise support
- **glob 10.3.10**: File pattern matching for template processing and validation

#### CLI User Experience

- **Chalk 5.3.0**: Terminal string styling and colors for better UX
- **Ora 7.0.1**: Elegant terminal spinners and progress indicators
- **validate-npm-package-name 5.0.0**: Package name validation for generated projects

#### Development and Quality Tools

- **ESLint 8.56.0**: JavaScript linting and code quality enforcement
- **Prettier 3.1.0**: Code formatting and style consistency
- **TypeScript 5.3.0**: Type definitions and enhanced development experience

## Development Setup

### Prerequisites and Installation

```bash
# Required versions
Node.js >= 18.0.0
PNPM >= 8.0.0

# Installation process
git clone <repository-url>
cd vibecode
pnpm install

# Available commands
pnpm run setup        # Interactive project setup
pnpm run test-setup   # Validate setup configuration
pnpm run dev          # Development mode setup
pnpm run test         # Run test suite
pnpm run lint         # Code linting
pnpm run format       # Code formatting
pnpm run validate     # Project validation
```

### Development Environment Configuration

- **Editor**: VSCode recommended with ESLint and Prettier extensions
- **Git Hooks**: Pre-commit validation via `scripts/agent-guardrails.sh`
- **Testing**: Node.js built-in test runner for validation scripts
- **CI/CD**: GitHub Actions for automated testing and validation

## Technical Constraints

### Platform Requirements

- **Node.js Version**: Minimum 18.0.0 for ES modules and modern JavaScript features
- **Package Manager**: PNPM 8+ required for workspace and dependency management
- **Operating Systems**: Cross-platform support for Windows, macOS, and Linux
- **Git**: Required for repository initialization and version control

### Performance Considerations

- **Template Processing**: Efficient handling of large template sets using streams
- **File Operations**: Async/await patterns for non-blocking I/O operations
- **Memory Usage**: Optimized for processing multiple templates simultaneously
- **Dependency Resolution**: PNPM's efficient node_modules structure reduces disk usage

### Security Constraints

- **Input Validation**: User input sanitization in template processing
- **File Permissions**: Secure file generation with appropriate access controls
- **Dependency Security**: Regular security audits and vulnerability scanning
- **Template Security**: Prevention of code injection through template variables

## AI Tool Integration Technologies

### Supported AI Coding Assistants

- **Windsurf**: Cascade, Memories, Supercomplete modes with custom rules
- **Roo Code**: Multi-agent collaboration with slash commands
- **KiloCode**: Memory Bank system with architect → code → debug workflow
- **Cline**: Memory Bank system with project-specific .clinerules configuration

### Memory Bank Technologies

- **KiloCode Memory Bank**: Located in `.kilocode/rules/memory-bank/`
- **Cline Memory Bank**: Located in `memory-bank/` with .clinerules configuration
- **File Format**: Markdown files for cross-tool compatibility
- **Synchronization**: Manual sync between different memory bank systems

### Configuration Management

- **Tool-Specific Settings**: Individual configuration files for each AI assistant
- **Prompt Templates**: Standardized interaction patterns in `prompts/` directory
- **Quality Gates**: Validation hooks for AI-generated code contributions
- **Workflow Integration**: CI/CD pipeline compatibility for AI-assisted development

## Development Workflow Technologies

### Code Quality Stack

```bash
# Linting and formatting
eslint src/ templates/     # JavaScript code quality
prettier --write .         # Code formatting

# Pre-commit validation
./scripts/agent-guardrails.sh  # Comprehensive quality checks

# Testing
node --test test/**/*.test.js  # Built-in Node.js test runner
```

### CI/CD Integration

- **GitHub Actions**: Automated testing, validation, and deployment
- **Quality Gates**: ESLint, Prettier, security scanning, and custom validation
- **Documentation**: Automated markdown linting and link validation
- **Release Management**: Semantic versioning and automated release processes

## Tool Usage Patterns

### Template Development Workflow

- **Handlebars Syntax**: `{{variable}}` for simple variable substitution
- **Template Helpers**: Custom helpers for complex logic and transformations
- **Partial Templates**: Reusable template components for consistency
- **Context Injection**: JSON-based template data from user input

### Project Generation Process

- **Interactive Setup**: User-guided project customization through CLI prompts
- **Batch Processing**: Efficient template processing using glob patterns
- **Validation Pipeline**: Post-generation project structure and configuration validation
- **Tool Configuration**: Automated setup of development tools and AI assistants

### Quality Assurance Automation

- **Golden Tests**: Snapshot-based regression testing for template outputs
- **Pre-commit Hooks**: Automated quality checks before code commits
- **CI Pipeline**: Continuous integration with comprehensive quality gates
- **Metrics Collection**: Development workflow analytics and performance tracking

## Dependencies and Tool Configurations

### Package.json Configuration

```json
{
  "type": "module",
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@8.15.0"
}
```

### ESLint Configuration

- **Target**: ES2022+ with Node.js environment
- **Rules**: Consistent code style and quality enforcement
- **Integration**: VSCode extension and CI/CD pipeline

### Prettier Configuration

- **Format**: Consistent code formatting across all file types
- **Integration**: Automatic formatting on save and pre-commit hooks
- **Compatibility**: Works with ESLint for comprehensive code quality

### Security Configuration

- **PNPM Overrides**: Explicit security patch management in package.json
- **Audit Process**: Regular dependency vulnerability scanning
- **Update Strategy**: Controlled dependency updates with testing validation
