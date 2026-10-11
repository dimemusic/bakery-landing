"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, PhoneCall, ShoppingBag, X } from "lucide-react";
import { useCart } from "../lib/cart";
import { BRAND, PHONES } from "../lib/site";
import { focusRing } from "../lib/ui";
import { piecesLabel } from "../lib/format";
import { LogoMark } from "./Doodles";

// Sizing: rem only, on an 8pt grid (1 Tailwind step = 4px at the 16px root, so use even steps).
// Header bar is a fixed 4.5rem (72px at the base size), independent of --header-h.
// Icons are 24px (size-6); 2px borders and 4px px-1 are the only sub-grid values.
// Links start with "/" so the anchors also work from /cart and /checkout.

const NAV_LINKS = [
  { href: "/#menu", label: "МЕНЮ" },
  { href: "/#delivery", label: "ДОСТАВКА" },
  { href: "/#faq", label: "ПИТАННЯ" },
  { href: "/#contacts", label: "КОНТАКТИ" },
];

function CartButton() {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      data-cart-target
      aria-label={count > 0 ? `Кошик: ${piecesLabel(count)}` : "Кошик порожній"}
      className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-brick-deep bg-coral text-ink transition-colors duration-200 hover:bg-peach sm:w-[4.5rem] ${focusRing}`}
    >
      <ShoppingBag className="size-6" aria-hidden="true" />
      {count > 0 && (
        <span
          key={count}
          aria-hidden="true"
          className="animate-pop absolute -top-2 -right-2 grid h-6 min-w-6 place-items-center rounded-full border-2 border-cream bg-brick px-1 text-xs leading-4 font-extrabold text-cream"
        >
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 h-18 border-b-2 border-dashed border-brick-soft bg-peach/95 backdrop-blur-sm">
      {/* The bar is full width; its content sits on the same .wrap container as the page */}
      <div className="wrap flex h-full items-center gap-4 sm:gap-6">
        <Link
          href="/"
          className={`flex items-center gap-2 rounded-lg font-heading text-2xl leading-8 text-brick sm:text-[2rem] sm:leading-10 ${focusRing}`}
        >
          <LogoMark className="size-10 shrink-0 -rotate-6 transition-transform duration-300 hover:rotate-6 sm:size-12" />
          {BRAND}
        </Link>

        <nav
          aria-label="Основна навігація"
          className="mx-auto hidden items-center gap-6 font-heading text-lg leading-6 text-brick-deep lg:flex xl:gap-10 xl:text-xl xl:leading-8"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg py-2 transition-colors hover:text-coral-deep hover:underline hover:decoration-wavy hover:underline-offset-4 ${focusRing}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-4 lg:ml-0">
          <a
            href={`tel:${PHONES[0].replace(/\s/g, "")}`}
            className={`hidden min-h-12 items-center gap-2 rounded-lg px-2 text-lg leading-6 font-bold whitespace-nowrap text-brick-deep hover:underline xl:flex ${focusRing}`}
          >
            <PhoneCall className="size-6" aria-hidden="true" />
            {PHONES[0]}
          </a>
          <CartButton />
          <button
            type="button"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`flex size-14 items-center justify-center rounded-2xl border-2 border-brick-deep text-brick-deep lg:hidden ${focusRing}`}
          >
            {open ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-full z-50 origin-top border-b-2 border-dashed border-brick-soft bg-peach transition duration-200 lg:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav
          aria-label="Мобільна навігація"
          className="wrap flex flex-col py-4 font-heading text-xl leading-8 text-brick-deep"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex min-h-12 items-center rounded-lg px-2 hover:bg-cream/60 ${focusRing}`}
            >
              {label}
            </Link>
          ))}
          <a
            href={`tel:${PHONES[0].replace(/\s/g, "")}`}
            className={`mt-2 flex min-h-12 items-center gap-2 rounded-lg px-2 font-body text-lg leading-6 font-bold ${focusRing}`}
          >
            <PhoneCall className="size-6" aria-hidden="true" />
            {PHONES[0]}
          </a>
        </nav>
      </div>
    </header>
  );
}
