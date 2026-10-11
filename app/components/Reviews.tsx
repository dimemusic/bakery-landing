import type { CSSProperties } from "react";
import { Quote } from "lucide-react";
import { REVIEWS } from "../lib/site";
import { sectionTitle } from "../lib/ui";

const TILTS = ["-1.5deg", "1deg", "-0.5deg"];

export default function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="bg-peach/50 section-y"
    >
      <div className="wrap">
        <h2 id="reviews-title" className={`rv text-center ${sectionTitle}`}>
          Що кажуть <span className="text-coral-deep">смакуни</span>
        </h2>

        <ul className="section-head-gap grid grid-cols-1 gap-8 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <li
              key={r.name}
              className="rv hover-wobble relative rounded-[26px_22px_28px_24px] border-2 border-dashed border-brick-soft bg-cream p-6 pt-9 shadow-sticker"
              style={{ rotate: TILTS[i], "--r": TILTS[i] } as CSSProperties}
            >
              <Quote
                size={36}
                aria-hidden="true"
                className="absolute -top-4 left-5 rounded-full bg-coral p-1.5 text-ink"
              />
              <blockquote className="text-lg text-brown">{r.text}</blockquote>
              <p className="mt-4 text-lg font-bold text-brick-deep">
                {r.name}, <span className="font-normal">{r.role}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
