import { DELIVERY_FEE, FREE_DELIVERY_FROM } from "./site";

export type DeliveryMethod = "delivery" | "pickup";

/** Delivery cost for a given subtotal. Pickup from a café is always free. */
export function deliveryCost(subtotal: number, method: DeliveryMethod) {
  if (method === "pickup" || subtotal <= 0) return 0;
  return subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}

/** How much more to add for free delivery (0 once reached). */
export function remainingForFree(subtotal: number) {
  return Math.max(0, FREE_DELIVERY_FROM - subtotal);
}
