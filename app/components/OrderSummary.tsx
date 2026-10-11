import type { ReactNode } from "react";
import type { CartLine } from "../lib/cart";
import { deliveryCost, type DeliveryMethod } from "../lib/delivery";
import { formatPrice, piecesLabel } from "../lib/format";
import { sticker } from "../lib/ui";
import FreeDeliveryBar from "./FreeDeliveryBar";

/** Sticky order summary: subtotal, delivery, free-delivery progress, total. The action goes in `children`. */
export default function OrderSummary({
  subtotal,
  count,
  method,
  lines,
  children,
}: {
  subtotal: number;
  count: number;
  method: DeliveryMethod;
  /** Optional compact item list (used on the checkout page). */
  lines?: CartLine[];
  children?: ReactNode;
}) {
  const delivery = deliveryCost(subtotal, method);

  return (
    <section
      aria-labelledby="summary-title"
      className={`p-6 lg:sticky lg:top-28 ${sticker}`}
    >
      <h2
        id="summary-title"
        className="font-heading text-2xl leading-8 text-brick"
      >
        Ваше замовлення
      </h2>

      {lines && (
        <ul className="mt-4 space-y-2 border-b-2 border-dashed border-brick-soft/50 pb-4 text-base leading-6 text-brick-deep">
          {lines.map((l) => (
            <li key={l.key} className="flex justify-between gap-4">
              <span className="min-w-0">
                {l.product.name}
                {l.size ? ` (${l.size.label})` : ""} × {l.qty}
              </span>
              <span className="shrink-0 font-bold">{formatPrice(l.price)}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-4 space-y-3 text-lg leading-6 text-brick-deep">
        <div className="flex justify-between gap-4">
          <dt>Товари ({piecesLabel(count)})</dt>
          <dd className="font-bold">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>{method === "pickup" ? "Самовивіз" : "Доставка"}</dt>
          <dd className="font-bold">
            {delivery === 0 ? "Безкоштовно" : formatPrice(delivery)}
          </dd>
        </div>
      </dl>

      {method === "delivery" && (
        <div className="mt-4">
          <FreeDeliveryBar subtotal={subtotal} />
        </div>
      )}

      <div className="mt-4 flex items-end justify-between gap-4 border-t-2 border-dashed border-brick-soft/60 pt-4">
        <span className="text-lg leading-6 font-bold text-brick-deep">
          Разом
        </span>
        <span className="font-heading text-[2.5rem] leading-10 text-brick">
          {formatPrice(subtotal + delivery)}
        </span>
      </div>

      {children}
    </section>
  );
}
