# System Patterns - Vibecode Blueprint

## System Architecture

### High-Level Architecture Pattern

The Vibecode Blueprint follows a **Template-Driven Generation Architecture** with intelligent automation and validation layers.

```
User Input → Interactive CLI → Template Engine → File Generation → Validation → Ready Project
```

### Core Architectural Patterns

#### 1. Template Method Pattern

- **Implementation**: Setup process follows defined steps with customization points
- **Location**: `src/setup.js` orchestrates the entire setup workflow
- **Benefits**: Consistent setup flow while allowing project-specific customizations

#### 2. Strategy Pattern

- **Implementation**: Different AI tool integrations (Windsurf, Roo Code, KiloCode, Cline)
- **Location**: Template selection and AI-specific configuration files
- **Benefits**: Pluggable AI tool support without modifying core framework

#### 3. Factory Pattern

- **Implementation**: Project generation based on user selections and templates
- **Location**: Template processing in `src/setup.js`
- **Benefits**: Consistent project structure with customizable components

## Key Technical Decisions

### 1. Node.js + ES Modules Architecture

- **Decision**: Use modern JavaScript with ES modules
- **Rationale**: Better tooling support, native async/await, future-proof
- **Impact**: Requires Node.js 18+ for optimal compatibility
- **Files**: All source files use ESM syntax

### 2. Handlebars for Templating

- **Decision**: Logic-less templating engine
- **Rationale**: Clear separation of data and presentation, security benefits
- **Impact**: Templates in `templates/` directory use `.hbs` extension
- **Usage**: Dynamic generation of configuration files and documentation

### 3. PNPM Package Management

- **Decision**: Use PNPM over npm/yarn
- **Rationale**: Efficient disk usage, strict dependency resolution, better monorepo support
- **Impact**: Requires PNPM 8+ for optimal performance
- **Configuration**: `pnpm-lock.yaml` and `.npmrc` configuration

### 4. Dual Memory Bank Strategy

- **Decision**: Support both KiloCode and Cline Memory Bank systems
- **Rationale**: Different AI tools have different memory bank requirements
- **Impact**: Parallel systems in `.kilocode/rules/memory-bank/` and `memory-bank/`
- **Maintenance**: Keep both systems synchronized with project changes

## Design Patterns in Use

### 1. Command Pattern

- **Implementation**: CLI commands for setup, validation, and testing
- **Location**: `package.json` scripts and `src/` modules
- **Usage**: `pnpm run setup`, `pnpm run validate`, `pnpm run test-setup`

### 2. Observer Pattern

- **Implementation**: Quality gates and validation hooks
- **Location**: `scripts/agent-guardrails.sh` and CI/CD pipelines
- **Usage**: Pre-commit hooks, GitHub Actions workflows

### 3. Builder Pattern

- **Implementation**: Progressive project configuration through interactive prompts
- **Location**: `src/setup.js` with inquirer.js integration
- **Usage**: Step-by-step project customization and generation

## Component Relationships

### Setup System Components

```
src/setup.js (Main Orchestrator)
├── inquirer.js (User Input)
├── handlebars (Template Processing)
├── fs-extra (File Operations)
├── glob (Pattern Matching)
└── validate.js (Quality Validation)
```

### Template System Components

```
templates/
├── .github/workflows/ (CI/CD Templates)
├── .eslintrc.js.hbs (Linting Configuration)
├── .gitignore.hbs (Git Configuration)
├── .prettierrc.hbs (Formatting Configuration)
└── *.md.hbs (Documentation Templates)
```

### Quality Assurance Components

```
Quality System
├── scripts/agent-guardrails.sh (Pre-commit Validation)
├── tests/golden/ (Regression Testing)
├── .github/workflows/ (CI/CD Pipelines)
└── policies/ (Review Guidelines)
```

## Critical Implementation Paths

### 1. Project Initialization Flow

```
User Command → CLI Prompts → Template Selection → Variable Collection → 
File Generation → Dependency Installation → Validation → Success
```

### 2. AI Tool Integration Flow

```
Tool Detection → Configuration Generation → Memory Bank Setup → 
Prompt Template Installation → Workflow Configuration → Ready for Use
```

### 3. Quality Validation Flow

```
Code Changes → Pre-commit Hooks → Linting/Formatting → 
Golden Tests → CI/CD Pipeline → Quality Gates → Deployment Ready
```

### 4. Memory Bank Synchronization

```
Project Changes → Update KiloCode Memory Bank → Update Cline Memory Bank → 
Validate Consistency → Commit Changes → CI/CD Validation
```

## Architecture Constraints

### File System Constraints

- Template processing requires read/write access to project directory
- Git repository initialization and configuration needed
- Cross-platform support (Windows, macOS, Linux) required

### Performance Constraints

- Template generation must be efficient for large template sets
- Concurrent file operations using async/await patterns
- Memory usage optimization for large project generations

### Security Constraints

- Input validation for user-provided data in templates
- Secure file generation with appropriate permissions
- Prevention of directory traversal attacks in template processing

## Integration Points

### External Tool Integration

- **Git**: Repository initialization and configuration
- **GitHub Actions**: CI/CD pipeline integration
- **AI Tools**: Windsurf, Roo Code, KiloCode, Cline configuration
- **Package Managers**: PNPM, npm compatibility

### Configuration Management

- **Environment Variables**: Development vs production settings
- **Template Variables**: User-provided customization data
- **Tool-Specific Settings**: AI assistant configurations
- **Quality Settings**: Linting, formatting, testing configurations
