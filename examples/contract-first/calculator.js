export const pricingContract = {
  currency: 'USD',
  taxRate: 0.08
};

export function calculateTotal({ subtotal, discount = 0 }) {
  const taxable = Math.max(subtotal - discount, 0);
  const tax = Number((taxable * pricingContract.taxRate).toFixed(2));
  return {
    subtotal,
    discount,
    tax,
    total: Number((taxable + tax).toFixed(2))
  };
}
