/** CAD amounts in cents — adjust to match your pricing. */
export const PAYMENT_PRODUCTS = {
  "bde-deposit": {
    name: "BDE course registration deposit",
    description: "Deposit toward a Ministry-approved BDE package. Remaining balance per school policy.",
    amountCents: 150_00,
  },
  "lesson-deposit": {
    name: "Individual lessons deposit",
    description: "Deposit toward G1→G2 or G2→G lesson packages.",
    amountCents: 100_00,
  },
} as const;

export type PaymentProductKey = keyof typeof PAYMENT_PRODUCTS;

export function formatCad(cents: number): string {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(cents / 100);
}
