# Contract-First Example

This example shows how to protect behavior with a **contract test** so agents can safely refactor implementations.

## Files

- `contract.test.js` – the contract (public behavior)
- `calculator.js` – implementation (safe to refactor)

## Why It Matters

When agents modify implementations, the contract test ensures public behavior is preserved. If the contract changes, it requires explicit approval.
