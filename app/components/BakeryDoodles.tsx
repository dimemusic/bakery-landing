/** Soft line-art bakery illustrations for the hero edges. Decorative only. */

const L = "#b76b65";
const s = {
  stroke: L,
  strokeWidth: 2.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Wrap({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none select-none ${className ?? ""}`}
    >
      {children}
    </svg>
  );
}

export function Cupcake({ className }: { className?: string }) {
  return (
    <Wrap className={className}>
      <path d="M24 56L31 90Q50 97 69 90L76 56Z" fill="#fed9b7" {...s} />
      <path
        d="M38 58L40 92M50 58V95M62 58L60 92"
        fill="none"
        {...s}
        strokeWidth={2}
        opacity={0.6}
      />
      <path
        d="M20 58Q16 44 31 42Q30 28 45 30Q52 18 63 28Q78 26 74 42Q86 46 80 58Z"
        fill="#fff8f2"
        {...s}
      />
      <circle cx="52" cy="20" r="6" fill="#f07167" {...s} strokeWidth={2.2} />
      <path
        d="M38 40l4-3M60 44l5-2M48 50l3 2"
        stroke="#00afb9"
        strokeWidth={2.6}
        strokeLinecap="round"
      />
    </Wrap>
  );
}

export function Cookie({ className }: { className?: string }) {
  return (
    <Wrap className={className}>
      <circle cx="50" cy="50" r="36" fill="#f6d3a2" {...s} />
      <ellipse cx="34" cy="38" rx="4.5" ry="3.5" fill={L} />
      <ellipse cx="62" cy="34" rx="4.5" ry="3.5" fill={L} />
      <ellipse cx="68" cy="58" rx="4" ry="3.5" fill={L} />
      <ellipse cx="38" cy="62" rx="4" ry="3.5" fill={L} />
      <ellipse cx="52" cy="76" rx="4" ry="3" fill={L} />
      <path d="M46 52q4 3 8 0" fill="none" {...s} strokeWidth={2.2} />
    </Wrap>
  );
}

export function Croissant({ className }: { className?: string }) {
  return (
    <Wrap className={className}>
      <path
        d="M8 66Q14 32 50 30Q86 32 92 66Q82 58 74 60Q66 42 50 42Q34 42 26 60Q18 58 8 66Z"
        fill="#f6d3a2"
        {...s}
      />
      <path
        d="M34 44L30 60M50 42V58M66 44L70 60"
        fill="none"
        {...s}
        strokeWidth={2.2}
      />
      <path
        d="M26 60Q20 74 12 72M74 60Q80 74 88 72"
        fill="none"
        {...s}
        strokeWidth={2.2}
      />
    </Wrap>
  );
}

export function CakeSlice({ className }: { className?: string }) {
  return (
    <Wrap className={className}>
      <path d="M12 62L88 46V82L12 90Z" fill="#fed9b7" {...s} />
      <path d="M12 62L88 46V56L12 72Z" fill="#fff8f2" {...s} />
      <path d="M12 78L88 64" fill="none" {...s} strokeWidth={2} />
      <path d="M12 62L22 56L88 40L88 46Z" fill="#fff8f2" {...s} />
      <circle cx="54" cy="38" r="6.5" fill="#f07167" {...s} strokeWidth={2.2} />
    </Wrap>
  );
}

export function RollingPin({ className }: { className?: string }) {
  return (
    <Wrap className={className}>
      <g transform="rotate(-24 50 50)">
        <rect
          x="26"
          y="40"
          width="48"
          height="20"
          rx="10"
          fill="#f6d3a2"
          {...s}
        />
        <rect
          x="8"
          y="45"
          width="20"
          height="10"
          rx="5"
          fill="#fff8f2"
          {...s}
        />
        <rect
          x="72"
          y="45"
          width="20"
          height="10"
          rx="5"
          fill="#fff8f2"
          {...s}
        />
      </g>
    </Wrap>
  );
}

export function Whisk({ className }: { className?: string }) {
  return (
    <Wrap className={className}>
      <g transform="rotate(20 50 50)">
        <path d="M50 8V34" {...s} strokeWidth={5} />
        <path
          d="M50 34C24 40 24 82 50 92C76 82 76 40 50 34Z"
          fill="none"
          {...s}
        />
        <path
          d="M50 34C38 46 38 76 50 92C62 76 62 46 50 34Z"
          fill="none"
          {...s}
        />
        <path d="M32 54H68M34 70H66" fill="none" {...s} strokeWidth={2} />
      </g>
    </Wrap>
  );
}
