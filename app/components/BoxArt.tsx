import { BOX_SLOTS, BRAND } from "../lib/site";
import type { ArtKind } from "../lib/products";
import { Sparkle } from "./Doodles";
import ProductArt from "./ProductArt";

/** Cartoon pastry box. One slot = one piece. Purely visual (the list next to it is the accessible view). */
export default function BoxArt({ pieces }: { pieces: ArtKind[] }) {
  const extra = Math.max(0, pieces.length - BOX_SLOTS);
  const full = pieces.length >= BOX_SLOTS;

  return (
    <div className="relative mx-auto w-full max-w-[500px]" aria-hidden="true">
      <Sparkle className="absolute -top-5 -left-4 h-8 w-8 text-teal" />
      <Sparkle
        className="absolute top-1/3 -right-2 h-6 w-6 sm:-right-6 text-coral"
        delay={1100}
      />
      <Sparkle
        className="absolute -bottom-3 left-8 h-5 w-5 text-teal"
        delay={600}
      />

      {/* lid, leaning back */}
      <div className="relative z-10 mx-auto -mb-4 w-[94%] -rotate-2 rounded-[16px_16px_8px_8px] border-4 border-brick bg-coral px-4 py-2 text-center font-heading text-3xl text-ink shadow-sticker">
        {BRAND}
        <span className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rounded-full border-4 border-brick bg-cream" />
      </div>

      {/* box body */}
      <div
        className={`rounded-[10px_10px_30px_30px] border-4 border-brick bg-peach p-3 pt-7 shadow-sticker-lg transition-shadow duration-500 ${
          full ? "shadow-[0_0_0_6px_rgb(0_175_185/0.35)]" : ""
        }`}
      >
        <div className="grid grid-cols-4 gap-2 rounded-2xl border-2 border-dashed border-brick-soft bg-cream p-2.5">
          {Array.from({ length: BOX_SLOTS }, (_, i) => {
            const kind = pieces[i];
            const isLast = i === BOX_SLOTS - 1 && extra > 0;
            return (
              <div
                key={i}
                className="relative grid aspect-square place-items-center rounded-2xl border-2 border-dashed border-brick-soft/50 bg-peach/50"
              >
                {kind && (
                  <ProductArt
                    key={`${i}-${kind}`}
                    kind={kind}
                    className="animate-drop-in size-[86%]"
                  />
                )}
                {isLast && (
                  <span className="absolute -top-2 -right-2 grid h-7 min-w-7 place-items-center rounded-full border-2 border-cream bg-coral px-1 text-xs font-extrabold text-ink">
                    +{extra}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
