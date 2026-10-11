/** Shared class strings. */

export const focusRing =
  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brick-deep";

export const btnPrimary = `inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-brick px-7 text-lg font-bold text-cream shadow-sticker transition duration-200 hover:-translate-y-0.5 hover:bg-brick-deep active:translate-y-0.5 active:shadow-none ${focusRing}`;

export const btnOutline = `inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-brick bg-cream px-7 text-center text-lg font-bold text-brick-deep transition duration-200 hover:-translate-y-0.5 hover:bg-peach active:translate-y-0.5 ${focusRing}`;

/** Peach, dashed, slightly irregular "sticker" card. */
export const sticker =
  "rounded-[26px_22px_28px_24px] border-2 border-dashed border-brick-soft bg-peach shadow-sticker";

export const sectionTitle =
  "font-heading text-[2.1rem] leading-[1.1] text-brick uppercase sm:text-5xl lg:text-[3.4rem]";
