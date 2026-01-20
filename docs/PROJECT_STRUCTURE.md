# Collaborative Vibecoding Project Structure

## 📁 Directory Overview

```
vibecode/
├── README.md                           # Main project documentation
├── AGENTS.md                           # AI agent guidelines (standard location)
├── CLAUDE.md                           # Claude-specific guidance
├── Makefile                            # Automation for common operations
├── .pre-commit-config.yaml             # Pre-commit hooks configuration
│
├── docs/                               # Documentation
│   ├── README.md                       # Documentation index
│   ├── architecture/                   
│   │   └── SYSTEM_ARCHITECTURE.md      # System design overview
│   ├── guides/                         
│   │   ├── CONTRIBUTING.md             # Development guidelines
│   │   ├── ONBOARDING.md               # New team member guide
│   │   ├── ONBOARDING_30_MINUTES.md    # Fast-track onboarding
│   │   ├── PRE_COMMIT.md               # Pre-commit hooks setup guide
│   │   ├── WINDSURF_TEAM_COLLABORATION.md # Windsurf collaboration guide
│   │   ├── COPILOT_AGENT_MODE.md       # Copilot agent mode guide
│   │   ├── CLAUDE_CODE.md              # Claude Code guide
│   │   ├── MCP.md                      # MCP memory server guide
│   │   └── AGENTS_AND_TOOL_RULES.md    # Tool rule alignment
│   └── templates/
│       └── AGENT_TASK_CHECKLIST.md     # Agent coordination checklist
│
├── policies/                           # Governance and rules
│   ├── CODEOWNERS                      # Package ownership definitions
│   └── REVIEW.md                       # Human review process guidelines
│
├── prompts/                            # AI prompt templates
│   ├── feature.md                      # New feature development template
│   ├── bugfix.md                       # Bug fixing template
│   └── refactor.md                     # Code refactoring template
│
├── templates/                          # Standard templates
│   ├── PR.md                           # Pull request template
│   ├── CommitMessage.md                # Commit message format guide
│   ├── AGENTS.md.hbs                   # Generator template for AGENTS.md
│   └── packages/                       # Package-level AGENTS templates
│       └── */AGENTS.md.hbs             # Per-package guidance
│
├── scripts/                            # Automation scripts
│   ├── agent-guardrails.sh            # Pre-commit validation script
│   ├── setup-pre-commit.sh            # Pre-commit hooks setup script
│   ├── pre-commit-validate-structure.sh # Structure validation script
│   └── pre-commit-check-agents.sh     # AGENTS.md validation script
│
├── src/                                # Implementation
│   ├── setup.js                        # Project setup generator
│   ├── test-setup.js                   # Deterministic generator run
│   └── mcp-memory/                     # Reference MCP memory server
│       ├── server.js                   # JSON-RPC MCP server
│       └── memory-store.js             # File-backed memory store
│
├── tests/                              # Tests
│   ├── golden/                         # Generator snapshots
│   ├── mcp-memory/                     # MCP server tests
│   └── setup/                          # Generator tests
│
└── examples/                           # Real-world examples
    ├── README.md                       # Examples overview
    ├── feature-example/                # Complete feature workflow example
    └── contract-first/                 # Contract-first testing example
```

## 🎯 What This Provides

### Core Framework

- **Complete project structure** for collaborative AI-assisted development
- **AGENTS.md file** following the standard format for AI agent guidance
- **Standardized templates** for common development scenarios  
- **Quality guardrails** to ensure AI-generated code meets standards
- **Documentation** for onboarding and ongoing development

### AI Integration

- **Prompt engineering templates** for consistent AI interactions
- **Agent guidelines** defining what AI can/cannot do
- **Review processes** for human oversight of AI contributions
- **Real examples** showing successful AI collaboration patterns

### Team Collaboration

- **CODEOWNERS** for managing package responsibilities
- **Review guidelines** for evaluating AI-generated code
- **Commit templates** for tracking AI contributions
- **Setup scripts** for quick project initialization

## 🚀 Quick Start

For setup instructions and getting started, see the main **[README.md](../README.md#-quick-start)**.

## 🛠 Key Features

- **Human-in-the-loop workflow**: AI proposes, humans approve
- **Contract-driven development**: Clear boundaries and expectations
- **Golden test protection**: Prevent regression in critical functionality  
- **Automated quality checks**: Pre-commit validation and CI/CD integration
- **Comprehensive examples**: Real-world patterns and best practices
- **Makefile automation**: Self-documenting commands for common operations
- **Pre-commit hooks**: Automatic code quality validation before commits
- **Documentation index**: Organized documentation by role and purpose

## 📖 Usage

This structure provides everything needed to implement collaborative vibecoding in your team:

- Use **prompt templates** (see `/prompts/`) to get consistent AI results
- Follow **review guidelines** (see `policies/REVIEW.md`) to maintain code quality
- Leverage **golden tests** (see `tests/golden/`) to protect critical business logic
- Run **guardrail scripts** (see `scripts/`) to catch issues before they reach production
- Use **Makefile commands** (run `make help`) for common operations
- Setup **pre-commit hooks** (see [docs/guides/PRE_COMMIT.md](guides/PRE_COMMIT.md)) for automatic validation

## 📚 Related Documentation

- **[README.md](../README.md)** - Main project overview and quick start
- **[AGENTS.md](../AGENTS.md)** - Comprehensive AI agent guidelines
- **[CLAUDE.md](../CLAUDE.md)** - Claude-specific guidance
- **[docs/README.md](README.md)** - Complete documentation index
- **[docs/guides/CONTRIBUTING.md](guides/CONTRIBUTING.md)** - Development workflow
- **[docs/guides/ONBOARDING_30_MINUTES.md](guides/ONBOARDING_30_MINUTES.md)** - Fast onboarding
- **[docs/guides/MCP.md](guides/MCP.md)** - MCP memory server usage

---

**Ready to start vibecoding?** Check out [docs/guides/ONBOARDING_30_MINUTES.md](guides/ONBOARDING_30_MINUTES.md) to get your team up and running!
