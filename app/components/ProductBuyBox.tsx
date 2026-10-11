"use client";

import { useEffect, useId, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "../lib/cart";
import { flyToCart } from "../lib/flyToCart";
import { formatPrice } from "../lib/format";
import type { Product } from "../lib/products";
import { focusRing } from "../lib/ui";
import QuantityStepper from "./QuantityStepper";

/** Price, size picker, quantity and "Додати в кошик" for the product page. */
export default function ProductBuyBox({
  product,
  photoId,
}: {
  product: Product;
  /** id of the photo element the "fly to cart" thumbnail starts from */
  photoId: string;
}) {
  const uid = useId();
  const { add } = useCart();
  const [sizeId, setSizeId] = useState(product.sizes?.[0]?.id);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const size = product.sizes?.find((s) => s.id === sizeId);
  const price = size?.price ?? product.price;
  const unit = size?.label ?? product.unit;

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1600);
    return () => clearTimeout(t);
  }, [justAdded]);

  return (
    <div className="space-y-6">
      {/* price: the number re-enters (small slide up) whenever it changes */}
      <p
        className="flex flex-wrap items-baseline gap-x-2 text-brick"
        aria-live="polite"
      >
        <span
          key={price}
          className="animate-tick font-heading text-[3.5rem] leading-[4rem]"
        >
          {price}
        </span>
        <span className="text-xl leading-8 font-bold text-brick-deep">
          грн / {unit}
        </span>
      </p>

      {product.sizes && (
        <fieldset>
          <legend className="mb-2 text-lg leading-6 font-bold text-brick-deep">
            Розмір
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const checked = s.id === size?.id;
              return (
                <label key={s.id} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name={`${uid}-size`}
                    value={s.id}
                    checked={checked}
                    onChange={() => setSizeId(s.id)}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex min-h-14 flex-col justify-center rounded-2xl border-2 px-4 transition-colors duration-200 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brick-deep ${
                      checked
                        ? "border-brick bg-brick text-cream"
                        : "border-brick-soft bg-cream text-brick-deep hover:border-brick hover:bg-peach"
                    }`}
                  >
                    <span className="flex items-center gap-1 text-base leading-6 font-bold">
                      {checked && (
                        <Check className="size-4" aria-hidden="true" />
                      )}
                      {s.label}
                    </span>
                    <span className="text-sm leading-5">
                      {formatPrice(s.price)} · {s.weight}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <p
            id={`${uid}-qty`}
            className="mb-2 text-lg leading-6 font-bold text-brick-deep"
          >
            Кількість
          </p>
          <QuantityStepper qty={qty} onChange={setQty} label={product.name} />
        </div>

        <button
          type="button"
          onClick={() => {
            add(product.slug, { sizeId: size?.id, qty });
            flyToCart(document.getElementById(photoId), product.image.src);
            setJustAdded(true);
          }}
          className={`inline-flex min-h-16 flex-1 items-center justify-center gap-2 rounded-2xl px-8 text-xl leading-8 font-bold whitespace-nowrap text-cream shadow-sticker transition-[background-color,box-shadow] duration-200 hover:shadow-sticker-lg active:shadow-none sm:flex-none ${focusRing} ${
            justAdded ? "bg-teal-deep" : "bg-brick hover:bg-brick-deep"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="size-6" aria-hidden="true" />
              Додано в кошик
            </>
          ) : (
            <>
              <ShoppingBag className="size-6" aria-hidden="true" />
              Додати в кошик
            </>
          )}
        </button>
      </div>

      {qty > 1 && (
        <p className="text-base leading-6 text-brick-deep">
          Разом: {qty} × {formatPrice(price)} ={" "}
          <strong className="font-bold">{formatPrice(price * qty)}</strong>
        </p>
      )}
    </div>
  );
}
