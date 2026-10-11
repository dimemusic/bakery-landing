"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "../lib/cart";
import { focusRing } from "../lib/ui";

const btn = `grid size-10 place-items-center rounded-xl border-2 border-brick text-brick-deep transition-colors hover:bg-brick hover:text-cream aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:bg-transparent aria-disabled:hover:text-brick-deep sm:size-12 ${focusRing}`;

/** − qty +. The buttons stay focusable at the limits (aria-disabled) so focus is never lost. */
export default function QuantityStepper({
  qty,
  onChange,
  label,
}: {
  qty: number;
  onChange: (qty: number) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={`Кількість: ${label}`}
      className="inline-flex items-center gap-2"
    >
      <button
        type="button"
        aria-label={`Менше: ${label}`}
        aria-disabled={qty <= 1}
        onClick={() => qty > 1 && onChange(qty - 1)}
        className={btn}
      >
        <Minus className="size-5" aria-hidden="true" />
      </button>
      <span
        aria-live="polite"
        aria-label={`${qty} шт.`}
        className="min-w-10 text-center font-heading text-2xl leading-8 text-brick-deep"
      >
        {qty}
      </span>
      <button
        type="button"
        aria-label={`Більше: ${label}`}
        aria-disabled={qty >= MAX_QTY}
        onClick={() => qty < MAX_QTY && onChange(qty + 1)}
        className={btn}
      >
        <Plus className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
