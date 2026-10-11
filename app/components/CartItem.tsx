"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import type { CartLine } from "../lib/cart";
import { formatPrice } from "../lib/format";
import { focusRing, sticker } from "../lib/ui";
import QuantityStepper from "./QuantityStepper";

/** One row of the cart: thumbnail, name + flavor, stepper, line price, remove. */
export default function CartItem({
  line,
  onQty,
  onRemove,
}: {
  line: CartLine;
  onQty: (qty: number) => void;
  onRemove: () => void;
}) {
  const label = line.size
    ? `${line.product.name}, ${line.size.label}`
    : line.product.name;
  return (
    <li
      className={`flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 ${sticker}`}
    >
      <div className="flex min-w-0 items-center gap-4 sm:flex-1">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl border-2 border-brick">
          <Image
            src={line.product.image.src}
            alt=""
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-heading text-2xl leading-8 text-brown">
            {line.product.name}
          </h2>
          <p className="text-base leading-6 font-bold text-brick-deep">
            {line.category.name}
            {line.size ? ` · ${line.size.label}` : ""}
          </p>
          <p className="text-sm leading-5 text-brick-deep">
            {formatPrice(line.unitPrice)} / {line.unitLabel}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 sm:flex-nowrap sm:justify-end">
        <QuantityStepper qty={line.qty} onChange={onQty} label={label} />
        <p className="min-w-20 text-right font-heading text-2xl leading-8 text-brick">
          {formatPrice(line.price)}
        </p>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Видалити з кошика: ${label}`}
          title="Видалити"
          className={`grid size-10 shrink-0 place-items-center rounded-xl text-brick-deep transition-colors hover:bg-cream hover:text-coral-deep sm:size-12 ${focusRing}`}
        >
          <Trash2 className="size-6" aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}
