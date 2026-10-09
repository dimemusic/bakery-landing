"use client";

import { useEffect, useState } from "react";
import { LogIn, Menu, ShoppingBag, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#menu", label: "МЕНЮ" },
  { href: "#contacts", label: "КОНТАКТИ" },
  { href: "#delivery", label: "ДОСТАВКА" },
];

function LoginButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`flex h-11 items-center gap-2 rounded-2xl border-2 border-coral bg-peach px-4 font-bold whitespace-nowrap text-coral transition-colors hover:bg-coral hover:text-peach focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral ${className}`}
    >
      Вхід / Реєстрація
      <LogIn size={24} aria-hidden="true" />
    </button>
  );
}

function CartButton() {
  return (
    <button
      type="button"
      aria-label="Кошик"
      className="flex h-[42px] w-[66px] items-center justify-center rounded-2xl border border-peach bg-coral text-cream transition-colors hover:bg-brick focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
    >
      <ShoppingBag size={24} aria-hidden="true" />
    </button>
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
    <header className="relative h-[71px] border-b-2 border-dashed border-brick-soft bg-peach">
      <div className="mx-auto flex h-full w-full max-w-[1040px] items-center px-4">
        <a
          href="#"
          className="min-w-0 font-heading text-[22px] leading-none font-bold tracking-[-0.02em] text-brick md:flex-1 md:text-[28px]"
        >
          BRAND
        </a>

        <nav
          aria-label="Основна навігація"
          className="hidden items-center gap-6 font-bold text-brick-soft md:flex lg:gap-[60px]"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="transition-colors hover:text-brick"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-4 md:flex md:flex-1">
          <LoginButton />
          <CartButton />
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <CartButton />
          <button
            type="button"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-2xl border-2 border-coral text-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            {open ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-50 border-b-2 border-dashed border-brick-soft bg-peach md:hidden"
        >
          <nav
            aria-label="Мобільна навігація"
            className="mx-auto flex max-w-[1040px] flex-col gap-4 px-4 py-5 font-bold text-brick-soft"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-1 transition-colors hover:text-brick"
              >
                {label}
              </a>
            ))}
            <LoginButton className="mt-2 justify-center" />
          </nav>
        </div>
      )}
    </header>
  );
}
