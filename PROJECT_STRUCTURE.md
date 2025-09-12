# Collaborative Vibecoding Project Structure

## 📁 Directory Overview

```
vibecode/
├── README.md                           # Main project documentation
├── AGENTS.md                           # AI agent guidelines (standard location)
│
├── docs/                               # Documentation
│   ├── architecture/                   
│   │   └── SYSTEM_ARCHITECTURE.md      # System design overview
│   └── guides/                         
│       ├── CONTRIBUTING.md              # Development guidelines
│       └── ONBOARDING.md               # New team member guide
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
│   ├── PR.md                          # Pull request template
│   └── CommitMessage.md               # Commit message format guide
│
├── scripts/                            # Automation scripts
│   └── agent-guardrails.sh            # Pre-commit validation script
│
├── tests/                              # Testing artifacts
│   └── golden/                         # Golden/snapshot tests
│       └── README.md                   # Golden test documentation
│
└── examples/                           # Real-world examples
    ├── README.md                       # Examples overview
    └── feature-example/                # Complete feature workflow example
        └── complete-workflow.md        # Step-by-step feature development
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

1. **Copy this structure** to your project repository
2. **Run the setup script**: `node src/setup.js`
3. **Customize AGENTS.md** with your project specifics
4. **Configure your AI tool** (Windsurf, Roo Code, KiloCode, etc.)
5. **Start vibecoding** using the prompt templates!

## 🛠 Key Features

- **Human-in-the-loop workflow**: AI proposes, humans approve
- **Contract-driven development**: Clear boundaries and expectations
- **Golden test protection**: Prevent regression in critical functionality  
- **Automated quality checks**: Pre-commit validation and CI/CD integration
- **Comprehensive examples**: Real-world patterns and best practices

## 📖 Usage

This structure provides everything needed to implement collaborative vibecoding in your team:

- Use **prompt templates** to get consistent AI results
- Follow **review guidelines** to maintain code quality
- Leverage **golden tests** to protect critical business logic
- Run **guardrail scripts** to catch issues before they reach production

The framework scales from small teams to large organizations and adapts to different AI coding tools while maintaining consistent quality and collaboration patterns.

---

**Ready to start vibecoding?** Check out `docs/guides/ONBOARDING.md` to get your team up and running!
