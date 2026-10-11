import { Sparkle } from "./Doodles";

const ITEMS = [
  "медовик",
  "печиво з шоколадом",
  "булочки з корицею",
  "еклери",
  "тірамісу в баночці",
  "мафіни з лохиною",
  "наполеон",
  "родинні рецепти",
  "доставка до дверей",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center ${hidden ? "marquee-dup" : ""}`}
    >
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-heading text-xl">{item}</span>
          <Sparkle className="h-4 w-4 shrink-0 text-cream" />
        </li>
      ))}
    </ul>
  );
}

/** Scrolling strip. Pauses on hover; under reduced motion it becomes a plain scrollable row. */
export default function Marquee() {
  return (
    <div
      className="marquee overflow-hidden border-y-2 border-dashed border-teal-ink/40 bg-teal py-3.5 text-teal-ink"
      role="region"
      aria-label="Що в меню"
      tabIndex={0}
    >
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
