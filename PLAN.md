# «Крендель» — plan

Cozy café with its own bakery (торти, печиво, десерти, булочки, тістечка, мафіни). Guests can visit, order delivery, or pick up from a café.

## Brand
Name: **Крендель** (pretzel logo). Tagline: *Затишне кафе з власною пекарнею.* (Trademark / domain availability is **not** checked.)

Type: **Marmelad** (headings, single weight, small text-stroke) + Nunito (body). Chosen over Comfortaa: both render Ї Є Ґ І correctly, but Comfortaa's Cyrillic lowercase «т» looks like an "m" in product names such as «Тістечка».

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing: hero, marquee, menu, why us, delivery, reviews, FAQ |
| `/cart` | **Кошик**: items, quantity steppers, sticky summary, free-delivery progress |
| `/checkout` | Contacts + delivery/pickup form, validation, fake success screen |

## Landing sections

| # | Section | Purpose | Interactions |
|---|---------|---------|--------------|
| 1 | **Header** (full-width bar, content on the page container, sticky) | Brand, anchors, phone, cart link | Cart badge bounces on add; burger menu; skip-link |
| 2 | **Hero** (fills the viewport) | One H1, CTAs ("Обрати солодощі" / "Завітати в кафе"), hours/phone | Photo card with floating pastry stickers, steam, pattern backdrop |
| 3 | **Marquee** | Menu at a glance | Pauses on hover/focus; static row under reduced motion |
| 4 | **Меню** `#menu` | 6 categories, 2 equal-height landscape cards per row | Flavor picker swaps text + price; "Як зберігати та алергени" accordion; **У кошик** + toast |
| 5 | **Чому «Крендель»** | Trust: years, cafés, family recipes | Count-up stats, quote bubble, 3 feature cards |
| 6 | **Доставка** | How it reaches you | Live "до 15:00 ще…" countdown (Kyiv time), 3 steps |
| 7 | **Відгуки** | Social proof | Tilted sticker cards |
| 8 | **Питання** | Storage, allergens, delivery, ordering | Accessible accordion |
| 9 | **Footer** `#contacts` | Contacts, hours, delivery zone | — |

## Cart & checkout
- **State:** `CartProvider` over a tiny `localStorage` store (`useSyncExternalStore`): SSR-safe, shared by all pages and tabs, falls back to memory if storage is blocked. Quantities are clamped to 1–20; unknown items in storage are dropped.
- **Header:** the cart button links to `/cart`; the badge shows the piece count and bounces on change.
- **Toast:** "Додано в кошик" with a link to the cart, shown on the page where the item was added, auto-hides after 5 s, always-mounted live region.
- **/cart:** two columns on desktop (items | sticky summary), stacked on mobile. Summary = subtotal, delivery cost, "Ще X грн до безкоштовної доставки" progress bar, total, "Оформити замовлення". Empty state reuses the cartoon box.
- **/checkout:** name, phone (UA formats), delivery or pickup (address, or a café from a list), comment. Errors show on blur / submit, focus jumps to the first invalid field, a `role="alert"` summary appears. The summary recalculates for the chosen method (pickup = free). The success screen shows an order number, moves focus to its heading and clears the cart. **Demo only:** nothing is sent, no payment.
- **Rules (sample values in `lib/site.ts`):** free delivery from 500 грн, otherwise 80 грн; pickup is always free.

## Cross-cutting
- Layout: `.wrap` = max 80rem with `clamp(1rem, 4vw, 3rem)` side padding; the header bar is full width but its content uses the same `.wrap`. Root font-size steps: 16px, 17px (≥1600), 19px (≥1920), 19px (≥2400, with an extra hero step).
- Motion: transforms/opacity only; scroll-reveal via CSS `animation-timeline: view()`; hover = 4px lift with a soft shadow (no wobble, buttons never move); global `prefers-reduced-motion` kill-switch.
- A11y: AA text shades, radio-based chips, `inert` for collapsed panels, live regions, 44px+ tap targets, labelled form fields with `aria-invalid` / `aria-describedby`.
- Photos: Unsplash (free license), credited in `CREDITS.md`.
- Sample data (prices, flavors, storage notes, reviews, phones, café names, delivery rules) lives in `app/lib`.

## Out of scope
Real payments, accounts / login, order sending (checkout is a demo).
