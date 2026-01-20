import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTotal, pricingContract } from './calculator.js';

test('pricing contract remains stable', () => {
  const result = calculateTotal({ subtotal: 100, discount: 20 });

  assert.equal(pricingContract.currency, 'USD');
  assert.equal(pricingContract.taxRate, 0.08);
  assert.deepEqual(result, {
    subtotal: 100,
    discount: 20,
    tax: 6.4,
    total: 86.4
  });
});
