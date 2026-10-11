"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CircleCheck, X } from "lucide-react";
import { useCart } from "../lib/cart";
import { focusRing } from "../lib/ui";

const VISIBLE_MS = 5000;

/** "Додано в кошик" toast with a link to /cart. The live region is always mounted so it is announced reliably. */
export default function CartToast() {
  const { toast, dismissToast } = useCart();
  const pathname = usePathname();
  const visible = toast && toast.path === pathname ? toast : null;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismissToast, VISIBLE_MS);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end"
    >
      {visible && (
        <div
          key={visible.id}
          className="reveal pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border-2 border-dashed border-brick-soft bg-cream p-4 shadow-sticker-lg"
        >
          <CircleCheck
            className="mt-0.5 size-6 shrink-0 text-teal-deep"
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <p className="text-lg leading-6 font-bold text-brick-deep">
              {visible.title}
            </p>
            <p className="truncate text-base leading-6 text-brown">
              {visible.name} · {visible.detail}
            </p>
            <Link
              href="/cart"
              onClick={dismissToast}
              className={`group mt-2 inline-flex min-h-10 items-center gap-1 rounded-lg font-bold text-coral-deep underline decoration-dashed underline-offset-4 hover:text-brick-deep ${focusRing}`}
            >
              Перейти в кошик
              <ArrowRight
                className="size-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
          <button
            type="button"
            onClick={dismissToast}
            aria-label="Закрити повідомлення"
            className={`grid size-10 shrink-0 place-items-center rounded-lg text-brick-deep hover:bg-peach ${focusRing}`}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
