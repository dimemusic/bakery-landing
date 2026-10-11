/**
 * "Add to cart" flourish: a small round thumbnail flies in an arc from `from` to the header
 * cart button (the element marked with `data-cart-target`). Transform/opacity only (Web
 * Animations API), purely decorative, and skipped entirely under prefers-reduced-motion.
 */
export function flyToCart(from: Element | null | undefined, imageSrc: string) {
  if (typeof window === "undefined" || !from) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const target = document.querySelector<HTMLElement>("[data-cart-target]");
  if (!target) return;

  const rem =
    parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const size = 4 * rem; // 64px at the base root size
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const startX = a.left + a.width / 2 - size / 2;
  const startY = a.top + a.height / 2 - size / 2;
  const dx = b.left + b.width / 2 - (startX + size / 2);
  const dy = b.top + b.height / 2 - (startY + size / 2);

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "";
  img.setAttribute("aria-hidden", "true");
  Object.assign(img.style, {
    position: "fixed",
    left: `${startX}px`,
    top: `${startY}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "9999px",
    objectFit: "cover",
    border: "2px solid var(--brick)",
    boxShadow: "var(--shadow-sticker)",
    zIndex: "70",
    pointerEvents: "none",
    willChange: "transform, opacity",
  });
  document.body.appendChild(img);

  const lift = Math.min(160, Math.abs(dy) * 0.4 + 4 * rem); // arc height
  const anim = img.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      {
        transform: `translate(${dx * 0.45}px, ${dy * 0.45 - lift}px) scale(0.85) rotate(-12deg)`,
        opacity: 1,
        offset: 0.5,
      },
      {
        transform: `translate(${dx}px, ${dy}px) scale(0.3) rotate(8deg)`,
        opacity: 0.15,
      },
    ],
    { duration: 720, easing: "cubic-bezier(0.45, 0, 0.3, 1)" },
  );
  const cleanup = () => img.remove();
  anim.onfinish = cleanup;
  anim.oncancel = cleanup;
}
