import type { CSSProperties } from "react";
import {
  Bean,
  CircleDot,
  Egg,
  Fish,
  Flower,
  Flower2,
  Leaf,
  Milk,
  Nut,
  Shrimp,
  Snail,
  Sprout,
  Wheat,
  Wine,
  type LucideIcon,
} from "lucide-react";
import type { Allergen } from "../lib/products";

const ICONS: Record<Allergen, LucideIcon> = {
  глютен: Wheat,
  ракоподібні: Shrimp,
  яйця: Egg,
  риба: Fish,
  арахіс: CircleDot,
  соя: Bean,
  молоко: Milk,
  горіхи: Nut,
  селера: Leaf,
  гірчиця: Flower2,
  кунжут: Sprout,
  сульфіти: Wine,
  люпин: Flower,
  молюски: Snail,
};

/**
 * Allergens as icon badges with labels. "contains" = solid, "may contain" = dashed outline.
 * Badges pop in with a small bounce, staggered (CSS only; off under reduced motion).
 */
export default function AllergenBadges({
  allergens,
  kind,
  startDelay = 0,
}: {
  allergens: Allergen[];
  kind: "contains" | "may-contain";
  /** ms, to continue a stagger from a previous group */
  startDelay?: number;
}) {
  const contains = kind === "contains";
  return (
    <ul className="flex flex-wrap gap-2">
      {allergens.map((a, i) => {
        const Icon = ICONS[a];
        return (
          <li
            key={a}
            className={`animate-pop-in inline-flex h-10 items-center gap-2 rounded-full border-2 px-3 text-base leading-6 font-bold ${
              contains
                ? "border-brick bg-brick text-cream"
                : "border-dashed border-brick-soft bg-cream text-brick-deep"
            }`}
            style={{ "--delay": `${startDelay + i * 70}ms` } as CSSProperties}
          >
            <Icon className="size-5 shrink-0" aria-hidden="true" />
            {a}
          </li>
        );
      })}
    </ul>
  );
}
