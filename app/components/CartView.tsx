"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "../lib/cart";
import { piecesLabel } from "../lib/format";
import { useMounted } from "../lib/useMounted";
import { btnPrimary, focusRing, sectionTitle } from "../lib/ui";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import OrderSummary from "./OrderSummary";

/** /cart: items on the left, sticky summary on the right (stacked on mobile). */
export default function CartView() {
  const { lines, count, subtotal, setQty, remove, clear } = useCart();
  // The cart lives in localStorage, so wait for hydration before choosing between "empty" and "items".
  const mounted = useMounted();

  return (
    <div className="wrap py-12 md:py-16">
      <h1 className={sectionTitle}>Кошик</h1>

      {!mounted ? (
        <div
          aria-busy="true"
          className="mt-10 h-64 rounded-[1.5rem] border-2 border-dashed border-brick-soft/50 bg-peach/40"
        />
      ) : lines.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <p className="mt-4 text-lg leading-8 text-brown">
            У кошику {piecesLabel(count)} Змініть кількість або видаліть зайве —
            підсумок оновиться одразу.
          </p>

          <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] xl:gap-12">
            <div>
              <ul className="space-y-4" aria-label="Товари в кошику">
                {lines.map((line) => (
                  <CartItem
                    key={line.key}
                    line={line}
                    onQty={(qty) => setQty(line.key, qty)}
                    onRemove={() => remove(line.key)}
                  />
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/#menu"
                  className={`group inline-flex min-h-12 items-center gap-2 rounded-lg px-2 text-lg leading-6 font-bold text-brick-deep underline decoration-dashed underline-offset-4 hover:text-coral-deep ${focusRing}`}
                >
                  <ArrowLeft
                    className="size-6 transition-transform group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                  Продовжити покупки
                </Link>
                <button
                  type="button"
                  onClick={clear}
                  className={`min-h-12 rounded-lg px-2 text-lg leading-6 font-bold text-brick-deep underline decoration-dashed underline-offset-4 hover:text-coral-deep ${focusRing}`}
                >
                  Очистити кошик
                </button>
              </div>
            </div>

            <OrderSummary subtotal={subtotal} count={count} method="delivery">
              <Link
                href="/checkout"
                className={`mt-6 w-full min-h-16 text-xl ${btnPrimary}`}
              >
                Оформити замовлення
                <ArrowRight className="size-6" aria-hidden="true" />
              </Link>
              <p className="mt-4 text-center text-sm leading-5 text-brick-deep">
                Самовивіз із кафе — безкоштовно. Спосіб отримання оберете на
                наступному кроці.
              </p>
            </OrderSummary>
          </div>
        </>
      )}
    </div>
  );
}
