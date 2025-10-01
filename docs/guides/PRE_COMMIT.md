# Pre-commit Hooks for Code Quality Validation

This project uses [pre-commit](https://pre-commit.com/) to automatically validate code quality before committing changes. This catches issues early and prevents CI/CD failures.

## Quick Setup

```bash
# Run the setup script
./scripts/setup-pre-commit.sh
```

Or manually:

```bash
# Install pre-commit
brew install pre-commit  # macOS
# OR
pip install pre-commit   # Linux/Windows

# Install the git hooks
pre-commit install
```

Or use the Makefile:

```bash
make pre-commit-install
```

## What Gets Validated

Pre-commit hooks will automatically check:

### ✅ Code Quality

- **Trailing Whitespace** - Removes trailing whitespace
- **End of File** - Ensures files end with a newline
- **YAML/JSON Syntax** - Validates syntax
- **Large Files** - Prevents committing files >1MB
- **Merge Conflicts** - Detects unresolved merge conflict markers
- **Private Keys** - Detects accidentally committed private keys

### ✅ Code Formatting

- **Prettier** - Formats JavaScript, TypeScript, JSON, YAML, and Markdown
- **Markdown Linting** - Validates Markdown syntax and style

### ✅ Project Structure

- **Structure Validation** - Ensures required directories and files exist
- **AGENTS.md Check** - Validates AGENTS.md file exists and has content

## Usage

### Automatic (Recommended)

Hooks run automatically on `git commit`:

```bash
git add .
git commit -m "Add new feature"
# Pre-commit hooks run automatically ✅
```

### Manual Execution

Run hooks manually on all files:

```bash
# Run all hooks
pre-commit run --all-files

# Or use Makefile
make pre-commit-run

# Run specific hook
pre-commit run prettier --all-files
```

### Skip Hooks (Not Recommended)

Only use in emergencies:

```bash
git commit --no-verify -m "Emergency fix"
```

## Troubleshooting

### Prettier formatting fails

```bash
# Auto-fix formatting issues
make format

# Then commit
git add .
git commit -m "Fix formatting"
```

### Markdown linting fails

```bash
# Check markdown linting rules
cat .markdownlint.json

# Fix issues manually or adjust rules
```

### Structure validation fails

```bash
# Check which files/directories are missing
./scripts/pre-commit-validate-structure.sh

# Create missing directories/files as needed
```

### Update pre-commit hooks

```bash
# Update to latest versions
pre-commit autoupdate

# Or use Makefile
make pre-commit-update

# Re-run on all files
pre-commit run --all-files
```

## Configuration

Pre-commit configuration is in `.pre-commit-config.yaml` at the repository root.

### Customizing Hooks

Edit `.pre-commit-config.yaml` to:

- Add new hooks
- Modify hook arguments
- Change file patterns
- Adjust validation rules

### Markdown Linting Rules

Edit `.markdownlint.json` to customize markdown linting rules.

## CI/CD Integration

Pre-commit hooks mirror the GitHub Actions workflow validation:

- Same formatting checks
- Same linting rules
- Same structure validation

This ensures:

- ✅ Faster feedback (local vs CI)
- ✅ Fewer failed CI runs
- ✅ Consistent validation everywhere

## Best Practices

1. **Always run pre-commit** - Don't skip hooks unless absolutely necessary
2. **Fix issues locally** - Faster than waiting for CI to fail
3. **Keep hooks updated** - Run `make pre-commit-update` monthly
4. **Test before committing** - Run `make validate` for full local validation

## Related Commands

```bash
# Full local validation
make validate

# Just linting
make lint

# Just formatting check
make format-check

# Auto-fix formatting
make format

# Run tests
make test
```

## Support

If you encounter issues with pre-commit hooks:

1. Check this documentation
2. Run `make validate` to see detailed errors
3. Check `.pre-commit-config.yaml` configuration
4. Review GitHub Actions logs for comparison

## Additional Resources

- **Pre-commit Documentation**: <https://pre-commit.com/>
- **Prettier**: <https://prettier.io/>
- **Markdownlint**: <https://github.com/DavidAnson/markdownlint>
