# Makefile for Vibecode Blueprint

.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: install
install: ## Install dependencies
	pnpm install

.PHONY: setup
setup: install ## Run interactive setup
	pnpm run setup

.PHONY: test
test: ## Run tests
	pnpm test

.PHONY: lint
lint: ## Run linting
	pnpm run lint

.PHONY: format
format: ## Format code
	pnpm run format

.PHONY: format-check
format-check: ## Check code formatting
	pnpm run format:check

.PHONY: validate
validate: lint format-check test ## Run all validation checks
	@echo "✓ All validation checks passed"

.PHONY: pre-commit-install
pre-commit-install: ## Install pre-commit hooks
	@if command -v pre-commit >/dev/null 2>&1; then \
		pre-commit install; \
		echo "✓ Pre-commit hooks installed"; \
	else \
		echo "⚠️  pre-commit not found. Run: ./scripts/setup-pre-commit.sh"; \
	fi

.PHONY: pre-commit-run
pre-commit-run: ## Run pre-commit hooks on all files
	pre-commit run --all-files

.PHONY: pre-commit-update
pre-commit-update: ## Update pre-commit hooks to latest versions
	pre-commit autoupdate

.PHONY: docs-serve
docs-serve: ## Serve documentation locally
	@echo "Documentation structure:"
	@echo "  - Main: README.md"
	@echo "  - Index: docs/README.md"
	@echo "  - Architecture: docs/architecture/"
	@echo "  - Guides: docs/guides/"

.PHONY: clean
clean: ## Clean generated files
	rm -rf node_modules/
	rm -rf dist/
	rm -rf build/
	rm -rf coverage/
	rm -rf .turbo/
	rm -rf test-output/
	rm -f *.log

.PHONY: clean-all
clean-all: clean ## Clean all generated files including lock files
	rm -f pnpm-lock.yaml
	rm -f package-lock.json
	rm -f yarn.lock

.PHONY: ci-validate
ci-validate: install lint format-check test ## Run CI validation
	@echo "✓ CI validation passed"

.PHONY: check-deps
check-deps: ## Check for outdated dependencies
	pnpm outdated

.PHONY: update-deps
update-deps: ## Update dependencies
	pnpm update

.PHONY: security-audit
security-audit: ## Run security audit
	pnpm audit

# Default target
.DEFAULT_GOAL := help
