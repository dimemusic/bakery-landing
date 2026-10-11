"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { lineKey, useCart } from "../lib/cart";
import { flyToCart } from "../lib/flyToCart";
import { piecesLabel } from "../lib/format";
import {
  categoryHref,
  productHref,
  type Category,
  type Product,
} from "../lib/products";
import { focusRing, sticker } from "../lib/ui";
import ProductArt from "./ProductArt";
import StorageInfo from "./StorageInfo";

// Rigid card template: every card has exactly the same structure and the same row heights,
// only the content differs. rem only, 8pt grid.
//
//   ┌────────────┬──────────────────────────┐
//   │            │ title            (2rem)  │  1 line, ellipsis
//   │  image     │ chips           (2.5rem) │  1 row, scrolls sideways, fade on the right
//   │  12rem ×   │ description       (3rem) │  exactly 2 lines
//   │  12rem     │ price · button    (3rem) │  one baseline, pinned to the bottom
//   ├────────────┴──────────────────────────┤
//   │ Як зберігати та алергени     (accordion)│
//   └───────────────────────────────────────┘
//
// Two modes, same template:
// - category card (landing): title = category (→ /menu/[category]), chips = products,
//   photo → page of the selected product.
// - product card (category page, "Також спробуйте"): title + photo → product page,
//   chips = sizes (cakes) or weight / kcal.
// Side-by-side layout is chosen by the CARD'S width (container query), not the viewport.
// Buttons and chips never move on hover: colour / shadow / focus ring only.

const chipBase =
  "flex h-10 items-center gap-1 rounded-full border-2 px-3 text-sm leading-5 font-bold whitespace-nowrap";

/** One row of chips: never wraps, scrolls sideways with snap, fades out on the right while more is hidden. */
function ChipRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setFade(el.scrollWidth - el.scrollLeft - el.clientWidth > 2);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    for (const child of Array.from(el.children)) ro.observe(child);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  const mask = fade
    ? "linear-gradient(to right, #000 calc(100% - 2rem), transparent)"
    : undefined;

  return (
    // negative margins + padding leave room for the focus rings inside the scroll box
    <div
      ref={ref}
      className="-mx-1 -my-2 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      {children}
    </div>
  );
}

/** A selectable chip (radio). */
function RadioChip({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label className="relative shrink-0 cursor-pointer snap-start">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={`${chipBase} transition-colors duration-200 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brick-deep ${
          checked
            ? "border-brick bg-brick text-cream"
            : "border-brick-soft bg-cream text-brick-deep hover:border-brick hover:bg-peach"
        }`}
      >
        {checked && <Check className="size-4" aria-hidden="true" />}
        {children}
      </span>
    </label>
  );
}

export default function ProductCard({
  category,
  products,
  mode = "category",
  priority = false,
}: {
  category: Category;
  /** category mode: the category's products (chips). product mode: exactly one product. */
  products: Product[];
  mode?: "category" | "product";
  priority?: boolean;
}) {
  const groupName = useId();
  const { add, lines } = useCart();
  const [slug, setSlug] = useState(products[0].slug);
  const [sizeId, setSizeId] = useState(products[0].sizes?.[0]?.id);
  const [justAdded, setJustAdded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const product = products.find((p) => p.slug === slug) ?? products[0];
  const isProductCard = mode === "product";
  const size = isProductCard
    ? product.sizes?.find((s) => s.id === sizeId)
    : undefined;
  const price = size?.price ?? product.price;
  const unit = size?.label ?? product.unit;
  const key = lineKey(product.slug, size?.id);
  const inCart = lines.find((l) => l.key === key)?.qty ?? 0;

  const image = isProductCard ? product.image : category.cover;
  const href = productHref(product);
  const title = isProductCard ? product.name : category.name;
  const titleHref = isProductCard ? href : categoryHref(category.id);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1400);
    return () => clearTimeout(t);
  }, [justAdded]);

  return (
    <article
      className={`rv hover-lift @container flex h-full flex-col gap-4 p-4 ${sticker}`}
    >
      <div className="grid grid-cols-1 gap-4 @lg:grid-cols-[12rem_minmax(0,1fr)]">
        {/* Image column: a fixed 12rem square beside the content (top-aligned, same in every card) */}
        <div ref={imageRef} className="relative w-full self-start @lg:size-48">
          <Link
            href={href}
            aria-label={`${product.name}: детальніше`}
            className={`zoom-on-hover relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border-2 border-brick @lg:aspect-auto @lg:h-full ${focusRing}`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              preload={priority}
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 36vw, 100vw"
              className="object-cover"
            />
            {inCart > 0 && (
              <span className="absolute bottom-2 left-2 rounded-full bg-teal-deep px-3 py-1 text-sm leading-5 font-bold text-cream">
                В кошику: {piecesLabel(inCart)}
              </span>
            )}
          </Link>
          <div
            key={justAdded ? "added" : "idle"}
            aria-hidden="true"
            className={`pointer-events-none absolute -top-3 -left-3 grid size-14 place-items-center rounded-full border-2 border-dashed border-brick-soft bg-cream shadow-sticker ${
              justAdded ? "animate-drop-in" : ""
            }`}
          >
            <ProductArt kind={category.art} className="size-10" />
          </div>
        </div>

        {/* Content column: four fixed rows = 12rem in total (2 + 2.5 + 3 + 3 + 3 × 0.5 gap) */}
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] grid-rows-[2rem_2.5rem_3rem_3rem] gap-2">
          <h3
            className="truncate font-heading text-2xl leading-8 text-brown"
            title={title}
          >
            <Link
              href={titleHref}
              className={`rounded-lg decoration-wavy decoration-2 underline-offset-4 hover:text-coral-deep hover:underline ${focusRing}`}
            >
              {title}
            </Link>
          </h3>

          {isProductCard ? (
            product.sizes ? (
              <fieldset className="min-w-0">
                <legend className="sr-only">Розмір</legend>
                <ChipRow>
                  {product.sizes.map((s) => (
                    <RadioChip
                      key={s.id}
                      name={groupName}
                      value={s.id}
                      checked={s.id === size?.id}
                      onChange={() => setSizeId(s.id)}
                    >
                      {s.label}
                    </RadioChip>
                  ))}
                </ChipRow>
              </fieldset>
            ) : (
              <ChipRow>
                <span
                  className={`${chipBase} shrink-0 border-dashed border-brick-soft text-brick-deep`}
                >
                  {product.weight}
                </span>
                <span
                  className={`${chipBase} shrink-0 border-dashed border-brick-soft text-brick-deep`}
                >
                  {product.kcalPer100g} ккал / 100 г
                </span>
              </ChipRow>
            )
          ) : (
            <fieldset className="min-w-0">
              <legend className="sr-only">Смак</legend>
              <ChipRow>
                {products.map((f) => (
                  <RadioChip
                    key={f.slug}
                    name={groupName}
                    value={f.slug}
                    checked={f.slug === product.slug}
                    onChange={() => setSlug(f.slug)}
                  >
                    {f.label}
                  </RadioChip>
                ))}
              </ChipRow>
            </fieldset>
          )}

          {/* exactly two lines; the full text stays in the DOM (and in the tooltip) */}
          <p
            aria-live="polite"
            title={product.shortDescription}
            className="line-clamp-2 min-h-12 text-base leading-6 text-brick-deep"
          >
            {product.shortDescription}
          </p>

          {/* price and unit share one baseline; the row sits at the bottom of the column */}
          <div className="flex items-center justify-between gap-2">
            <p
              aria-live="polite"
              className="flex min-w-0 items-baseline gap-1 whitespace-nowrap text-brick"
            >
              <span
                key={price}
                className="animate-tick font-heading text-[2rem] leading-8"
              >
                {price}
              </span>
              <span className="truncate text-base leading-6 font-bold text-brick-deep">
                грн / {unit}
              </span>
            </p>

            <button
              type="button"
              onClick={() => {
                add(product.slug, { sizeId: size?.id });
                flyToCart(imageRef.current, product.image.src);
                setJustAdded(true);
              }}
              aria-label={`У кошик: ${product.name}${size ? `, ${size.label}` : ""}`}
              className={`inline-flex h-12 min-w-30 shrink-0 items-center justify-center gap-1 rounded-2xl px-3 text-base leading-6 font-bold text-cream shadow-sticker transition-[background-color,box-shadow] duration-200 hover:shadow-sticker-lg active:shadow-none ${focusRing} ${
                justAdded ? "bg-teal-deep" : "bg-brick hover:bg-brick-deep"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="size-5" aria-hidden="true" />
                  Додано!
                </>
              ) : (
                <>
                  <Plus className="size-5" aria-hidden="true" />У кошик
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Accordion: full width, always at the bottom of the card */}
      <div className="mt-auto border-t-2 border-dashed border-brick-soft/50 pt-2">
        <StorageInfo care={product} />
      </div>
    </article>
  );
}
