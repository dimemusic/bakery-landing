"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { FAQ } from "../lib/site";
import { focusRing, sectionTitle } from "../lib/ui";
import Collapse from "./Collapse";

export default function Faq() {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y">
      <div className="wrap">
        <h2 id="faq-title" className={`rv text-center ${sectionTitle}`}>
          Часті <span className="text-coral-deep">питання</span>
        </h2>

        <div className="section-head-gap mx-auto max-w-5xl space-y-4">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="rv rounded-[20px_18px_22px_18px] border-2 border-dashed border-brick-soft bg-peach/60 transition-colors duration-200 hover:bg-peach"
              >
                <h3>
                  <button
                    type="button"
                    id={`${uid}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={`flex min-h-14 w-full items-center gap-4 rounded-[18px] px-6 py-4 text-left text-xl font-bold text-brick-deep ${focusRing}`}
                  >
                    <span className="flex-1">{item.q}</span>
                    <Plus
                      size={24}
                      aria-hidden="true"
                      className={`shrink-0 text-coral-deep transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                </h3>
                <Collapse
                  open={isOpen}
                  id={`${uid}-a${i}`}
                  labelledBy={`${uid}-q${i}`}
                >
                  <p className="px-6 pb-6 text-lg text-brick-deep">{item.a}</p>
                </Collapse>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
