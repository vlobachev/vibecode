# Vibecode Blueprint Architecture

## System Architecture

### High-Level Design

The Vibecode Blueprint follows a **template-driven architecture** with intelligent setup automation. The system is designed as a reusable blueprint that generates customized project structures for AI-assisted collaborative development.

### Core Components

#### 1. Setup System (`src/setup.js`)

- **Interactive CLI**: Handlebars-powered templating with inquirer.js prompts
- **Project Generation**: Creates customized project structures from templates
- **Validation**: Ensures generated projects meet quality standards
- **Configuration Management**: Handles project-specific customizations

#### 2. Template Engine (`templates/`)

- **Handlebars Templates**: `.hbs` files for dynamic content generation
- **Configuration Files**: ESLint, Prettier, Git configurations
- **Documentation Templates**: PR templates, commit message formats
- **Workflow Templates**: GitHub Actions, CI/CD pipelines

#### 3. Documentation Framework (`docs/`)

- **Architecture Documentation**: System design and technical decisions
- **Guides**: Contributing guidelines, onboarding materials
- **Standards**: Code review processes, quality metrics

#### 4. Quality Assurance (`scripts/`, `tests/`)

- **Pre-commit Hooks**: `agent-guardrails.sh` for validation
- **Golden Tests**: Baseline snapshots for regression prevention
- **CI/CD Integration**: Automated quality checks

### Source Code Paths

```
src/
├── setup.js           # Main setup orchestration
├── test-setup.js      # Setup validation and testing
└── validate.js        # Project validation logic

templates/
├── .github/workflows/ # CI/CD pipeline templates
├── .eslintrc.js.hbs  # ESLint configuration template
├── .gitignore.hbs    # Git ignore template
└── .prettierrc.hbs   # Prettier configuration template

docs/
├── architecture/      # System design documentation
└── guides/           # Development and onboarding guides

policies/
├── CODEOWNERS        # Package ownership definitions
└── REVIEW.md         # Code review guidelines

prompts/
├── feature.md        # Feature development templates
├── bugfix.md         # Bug fixing templates
└── refactor.md       # Refactoring templates
```

## Key Technical Decisions

### 1. Node.js + ESM Architecture

- **Rationale**: Modern JavaScript with ES modules for better tooling support
- **Benefits**: Native async/await, better tree-shaking, future-proof
- **Requirements**: Node.js 18+ for optimal compatibility

### 2. Handlebars Templating

- **Rationale**: Logic-less templates prevent complex template code
- **Benefits**: Clear separation of data and presentation, security
- **Usage**: Dynamic generation of configuration files and documentation

### 3. Interactive Setup with Inquirer.js

- **Rationale**: User-friendly CLI experience for project customization
- **Benefits**: Guided setup, validation, consistent user experience
- **Integration**: Seamless integration with template generation

### 4. PNPM Package Management

- **Rationale**: Efficient disk usage, strict dependency resolution
- **Benefits**: Faster installs, better monorepo support, security
- **Version**: PNPM 8+ for optimal performance

## Design Patterns

### 1. Template Method Pattern

- **Implementation**: Setup process follows defined steps with customization points
- **Benefits**: Consistent setup flow with flexibility for project-specific needs

### 2. Strategy Pattern

- **Implementation**: Different AI tool integrations (Windsurf, Roo Code, KiloCode)
- **Benefits**: Pluggable AI tool support without core changes

### 3. Factory Pattern

- **Implementation**: Project generation based on user selections
- **Benefits**: Consistent project structure with customizable components

## Component Relationships

### Setup Flow

```
User Input → Inquirer Prompts → Template Selection → Handlebars Processing → File Generation → Validation → Project Ready
```

### Quality Assurance Flow

```
Code Changes → Pre-commit Hooks → Golden Tests → CI/CD Pipeline → Quality Gates → Deployment
```

## Critical Implementation Paths

### 1. Project Initialization

- Template selection and customization
- File generation and directory structure creation
- Dependency installation and configuration
- Initial validation and setup verification

### 2. AI Tool Integration

- Detection of available AI coding tools
- Configuration of tool-specific settings
- Setup of prompt templates and workflows
- Integration with quality assurance processes

### 3. Quality Validation

- Pre-commit hook execution
- Golden test validation
- CI/CD pipeline integration
- Metrics collection and reporting
