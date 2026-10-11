/** Small decorative SVGs. All aria-hidden; motion is CSS-only. */

export function Sparkle({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={`animate-twinkle pointer-events-none ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <path
        d="M12 1c1 6 4 9 11 11-7 2-10 5-11 11-1-6-4-9-11-11 7-2 10-5 11-11Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Three wisps of steam rising. */
export function Steam({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 50"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none ${className}`}
    >
      {[10, 30, 50].map((x, i) => (
        <path
          key={x}
          d={`M${x} 46c-8-8 8-14 0-22s8-14 0-22`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="animate-steam"
          style={{ animationDelay: `${i * 700}ms` }}
        />
      ))}
    </svg>
  );
}

/** Hand-drawn wavy underline. */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none ${className}`}
    >
      <path
        d="M2 7c12-8 20 6 32 0s20-6 32 0 20 6 32 0 20-6 32 0 20 6 32 0 20-4 36 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Logo mark: a cute smiling pretzel. One rope (left foot, up over the right lobe, round the belly, over the left lobe and back across the middle to the right foot), drawn as a double stroke: brick outline, golden fill. */
export function LogoMark({ className = "" }: { className?: string }) {
  const rope =
    "M10 54C18 46 26 40 32 34C38 28 44 14 52 12C62 10 64 26 58 38C54 48 44 56 32 56C20 56 10 48 6 38C0 26 2 10 12 12C20 14 26 28 32 34";
  // the last strand is drawn again on top, so the rope visibly crosses over itself
  const over = "M12 12C20 14 26 28 32 34C38 40 46 46 54 54";
  return (
    <svg
      viewBox="-4 -4 72 72"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={rope} stroke="#85403a" strokeWidth="10" />
      <path d={rope} stroke="#e9a965" strokeWidth="4.8" />
      <path d={over} stroke="#85403a" strokeWidth="10" />
      <path d={over} stroke="#e9a965" strokeWidth="4.8" />
      <ellipse cx="6.5" cy="22" rx="1.7" ry="1.2" fill="#fff8f2" />
      <ellipse cx="57.5" cy="22" rx="1.7" ry="1.2" fill="#fff8f2" />
      <ellipse cx="20" cy="55" rx="1.7" ry="1.2" fill="#fff8f2" />
      <ellipse cx="44" cy="55" rx="1.7" ry="1.2" fill="#fff8f2" />
      <circle cx="27" cy="45" r="2" fill="#85403a" stroke="none" />
      <circle cx="37" cy="45" r="2" fill="#85403a" stroke="none" />
      <path d="M29.5 49q2.5 2.6 5 0" stroke="#85403a" strokeWidth="1.7" />
    </svg>
  );
}
