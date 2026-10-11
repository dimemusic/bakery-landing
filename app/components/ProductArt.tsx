import type { ArtKind } from "../lib/products";

const LINE = "#85403a";
const sk = {
  stroke: LINE,
  strokeWidth: 3.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Face({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x - 9} cy={y} r={2.8} fill={LINE} />
      <circle cx={x + 9} cy={y} r={2.8} fill={LINE} />
      <path
        d={`M${x - 5} ${y + 6} q5 5 10 0`}
        fill="none"
        stroke={LINE}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <ellipse
        cx={x - 16}
        cy={y + 6}
        rx={4.2}
        ry={2.6}
        fill="#f07167"
        opacity={0.6}
      />
      <ellipse
        cx={x + 16}
        cy={y + 6}
        rx={4.2}
        ry={2.6}
        fill="#f07167"
        opacity={0.6}
      />
    </g>
  );
}

/** Little cartoon characters, one per product. 120×120, decorative. */
export default function ProductArt({
  kind,
  className,
}: {
  kind: ArtKind;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {kind === "cake" && (
        <>
          <rect x="16" y="46" width="88" height="50" rx="10" fill="#f4be74" />
          <rect x="16" y="54" width="88" height="7" fill="#fff3c4" />
          <rect x="16" y="86" width="88" height="6" fill="#fff3c4" />
          <path
            d="M16 52q8-12 20-6t24-2 24 2 20 6v-6q0-6-8-6H24q-8 0-8 6Z"
            fill="#fff8f2"
          />
          <rect
            x="16"
            y="46"
            width="88"
            height="50"
            rx="10"
            fill="none"
            {...sk}
          />
          <circle
            cx="60"
            cy="36"
            r="8"
            fill="#f07167"
            {...sk}
            strokeWidth={3}
          />
          <path d="M60 28q3-6 8-6" fill="none" {...sk} strokeWidth={2.6} />
          <Face x={60} y={74} />
        </>
      )}
      {kind === "cookie" && (
        <>
          <circle cx="60" cy="62" r="44" fill="#f1c58b" {...sk} />
          <ellipse cx="32" cy="46" rx="5" ry="4" fill={LINE} />
          <ellipse cx="90" cy="42" rx="5" ry="4" fill={LINE} />
          <ellipse cx="96" cy="74" rx="4.5" ry="4" fill={LINE} />
          <ellipse cx="28" cy="78" rx="4.5" ry="4" fill={LINE} />
          <ellipse cx="62" cy="96" rx="4.5" ry="3.5" fill={LINE} />
          <ellipse cx="64" cy="30" rx="4.5" ry="3.5" fill={LINE} />
          <Face x={60} y={62} />
        </>
      )}
      {kind === "dessert" && (
        <>
          <path d="M24 46H96L86 98Q60 108 34 98Z" fill="#c98a52" {...sk} />
          <path d="M28 46H92L90 58H30Z" fill="#fff8f2" stroke="none" />
          <path d="M24 46H96L86 98Q60 108 34 98Z" fill="none" {...sk} />
          <path d="M32 46q8-14 18-8t20-2 18 10" fill="#fff8f2" {...sk} />
          <circle
            cx="60"
            cy="28"
            r="8"
            fill="#f07167"
            {...sk}
            strokeWidth={3}
          />
          <path d="M60 20q-2-6 4-8" fill="none" {...sk} strokeWidth={2.6} />
          <Face x={60} y={78} />
        </>
      )}
      {kind === "bun" && (
        <>
          <path
            d="M10 76C10 42 34 24 60 24s50 18 50 52c0 16-20 22-50 22S10 92 10 76Z"
            fill="#e9a965"
            {...sk}
          />
          <path
            d="M24 48q12-8 24-4t24-2 22 8"
            fill="none"
            stroke="#fff8f2"
            strokeWidth={5}
            strokeLinecap="round"
          />
          <path
            d="M26 38q8-6 14-8"
            fill="none"
            stroke="#ffd9a0"
            strokeWidth={4.5}
            strokeLinecap="round"
          />
          <Face x={60} y={72} />
        </>
      )}
      {kind === "eclair" && (
        <>
          <g transform="rotate(-8 60 62)">
            <rect
              x="8"
              y="42"
              width="104"
              height="42"
              rx="21"
              fill="#f4be74"
              {...sk}
            />
            <path
              d="M12 56Q12 44 30 44H90Q108 44 108 56Q100 64 92 56Q84 66 76 56Q68 66 60 56Q52 66 44 56Q36 66 28 56Q20 64 12 56Z"
              fill="#8a5a44"
              {...sk}
              strokeWidth={3}
            />
            <Face x={60} y={72} />
          </g>
        </>
      )}
      {kind === "muffin" && (
        <>
          <path d="M18 60Q16 22 60 22t42 38Z" fill="#e9a965" {...sk} />
          <circle cx="40" cy="38" r="4" fill="#5b6fb0" />
          <circle cx="76" cy="34" r="4" fill="#5b6fb0" />
          <circle cx="90" cy="50" r="3.6" fill="#5b6fb0" />
          <path d="M22 60H98L90 100Q60 106 30 100Z" fill="#fed9b7" {...sk} />
          <path
            d="M42 62L44 100M60 62V104M78 62L76 100"
            fill="none"
            stroke={LINE}
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.5}
          />
          <Face x={60} y={82} />
        </>
      )}
    </svg>
  );
}
