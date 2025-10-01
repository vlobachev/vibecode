# Vibecode Blueprint - Technology Stack

## Core Technologies

### Runtime & Language

- **Node.js 18+**: Modern JavaScript runtime with ES modules support
- **JavaScript (ESM)**: ES2022+ features, native async/await, top-level await
- **Package Manager**: PNPM 8.15.0 for efficient dependency management

### Key Dependencies

#### Setup & Templating

- **Handlebars 4.7.8**: Logic-less templating engine for file generation
- **Inquirer.js 9.2.12**: Interactive command-line user interfaces
- **fs-extra 11.2.0**: Enhanced file system operations
- **glob 10.3.10**: File pattern matching for template processing

#### CLI & User Experience

- **Chalk 5.3.0**: Terminal string styling and colors
- **Ora 7.0.1**: Elegant terminal spinners and progress indicators
- **validate-npm-package-name 5.0.0**: Package name validation

#### Development Tools

- **ESLint 8.56.0**: JavaScript linting and code quality
- **Prettier 3.1.0**: Code formatting and style consistency
- **TypeScript 5.3.0**: Type definitions and development support

## Development Setup

### Prerequisites

```bash
# Required versions
Node.js >= 18.0.0
PNPM >= 8.0.0
```

### Installation & Setup

```bash
# Clone and install dependencies
git clone <repository-url>
cd vibecode
pnpm install

# Or use Makefile
make install

# Run interactive setup
make setup
# OR
pnpm run setup
```

### Available Commands

See `make help` for all available commands, or use these common ones:

```bash
# Setup and installation
make install              # Install dependencies
make setup               # Interactive project setup

# Development
pnpm run dev             # Development mode setup
pnpm run test-setup      # Validate setup configuration

# Quality checks
make validate            # Run all validation checks
make lint                # Code linting
make format              # Code formatting
make test                # Run test suite

# Pre-commit hooks
make pre-commit-install  # Install pre-commit hooks
make pre-commit-run      # Run pre-commit hooks manually
```

## Technical Constraints

### Node.js Version Requirements

- **Minimum**: Node.js 18.0.0 for ES modules and modern features
- **Recommended**: Latest LTS version for optimal performance
- **Package Manager**: PNPM 8+ required for workspace support

### File System Requirements

- **Template Processing**: Requires read/write access to project directory
- **Git Integration**: Git repository initialization and configuration
- **Cross-Platform**: Support for Windows, macOS, and Linux

### Memory & Performance

- **Template Generation**: Efficient processing of large template sets
- **Dependency Resolution**: PNPM's efficient node_modules structure
- **Concurrent Operations**: Async/await for non-blocking file operations

## AI Tool Integration

### Supported AI Coding Tools

- **Windsurf**: Cascade, Memories, Supercomplete modes
- **Roo Code**: Multi-agent collaboration with slash commands
- **KiloCode**: Open-source orchestration (architect → code → debug)
- **Cline**: Memory Bank integration for context preservation
- **Claude Desktop**: MCP server integration
- **Generic**: Any agentic IDE following established conventions

### Integration Patterns

- **Configuration Files**: Tool-specific settings and preferences
- **Prompt Templates**: Standardized AI interaction patterns
- **Quality Gates**: Validation hooks for AI-generated code
- **Workflow Integration**: CI/CD pipeline compatibility

### Memory Bank Systems

For AI tools that support memory banks:

- **KiloCode**: `.kilocode/rules/memory-bank/` - See [.kilocode/rules/memory-bank-instructions.md](../.kilocode/rules/memory-bank-instructions.md)
- **Cline**: `memory-bank/` - See [Cline Memory Bank documentation](https://docs.cline.bot/prompting/cline-memory-bank)

## Development Workflow

### Code Quality Stack

```bash
# Pre-commit validation
./scripts/agent-guardrails.sh
./scripts/pre-commit-validate-structure.sh

# Linting and formatting
eslint src/ templates/
prettier --write .

# Testing
node --test test/**/*.test.js
```

### CI/CD Integration

- **GitHub Actions**: Automated testing and validation
- **Quality Gates**: ESLint, Prettier, and custom validation
- **Documentation**: Automated docs generation and validation
- **Release**: Semantic versioning and automated releases

See `.github/workflows/` for complete CI/CD configuration.

## Tool Usage Patterns

### Template Development

- **Handlebars Syntax**: `{{variable}}` for simple substitution
- **Helpers**: Custom helpers for complex template logic
- **Partials**: Reusable template components
- **Context**: JSON-based template data injection

### Project Generation

- **Interactive Prompts**: User-guided project customization
- **File Processing**: Batch template processing with glob patterns
- **Validation**: Post-generation project structure validation
- **Configuration**: Automated tool configuration setup

### Quality Assurance

- **Golden Tests**: Snapshot-based regression testing
- **Pre-commit Hooks**: Automated quality checks before commits
- **CI Pipeline**: Continuous integration with quality gates
- **Metrics Collection**: Development workflow analytics

## Security Considerations

### Dependency Management

- **PNPM Overrides**: Explicit security patch management
- **Version Pinning**: Controlled dependency updates
- **Audit**: Regular security vulnerability scanning

```bash
# Security audit
make security-audit
# OR
pnpm audit
```

### Template Security

- **Input Validation**: User input sanitization in templates
- **File Permissions**: Secure file generation and permissions
- **Path Traversal**: Prevention of directory traversal attacks

## Related Documentation

- **[docs/PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Project overview and objectives
- **[docs/architecture/SYSTEM_ARCHITECTURE.md](architecture/SYSTEM_ARCHITECTURE.md)** - System architecture
- **[docs/PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Complete directory structure
- **[docs/guides/CONTRIBUTING.md](guides/CONTRIBUTING.md)** - Development workflow
- **[README.md](../README.md)** - Quick start guide
- **[Makefile](../Makefile)** - All available commands

---

**Last Updated**: 2025-10-01  
**Maintained By**: Vibecode Team
