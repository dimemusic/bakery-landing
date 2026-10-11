"use client";

import { useId, useState } from "react";
import { ChevronDown, Clock, Thermometer, TriangleAlert } from "lucide-react";
import type { CareInfo } from "../lib/products";
import { focusRing } from "../lib/ui";
import Collapse from "./Collapse";

/** "Як зберігати та алергени": compact accordion with care notes for one product. */
export default function StorageInfo({ care }: { care: CareInfo }) {
  const uid = useId();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        id={`${uid}-btn`}
        aria-expanded={open}
        aria-controls={`${uid}-panel`}
        onClick={() => setOpen((v) => !v)}
        className={`flex min-h-10 w-full items-center gap-2 rounded-lg px-1 text-left text-base leading-6 font-bold text-brick-deep transition-colors hover:text-coral-deep ${focusRing}`}
      >
        <Thermometer className="size-6 shrink-0" aria-hidden="true" />
        Як зберігати та алергени
        <ChevronDown
          className={`ml-auto size-6 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <Collapse open={open} id={`${uid}-panel`} labelledBy={`${uid}-btn`}>
        <ul className="mt-2 space-y-2 rounded-2xl border-2 border-dashed border-brick-soft/70 bg-cream p-3 text-sm leading-5 text-brick-deep">
          <li className="flex gap-2">
            <Thermometer
              className="size-4 shrink-0 text-teal-deep"
              aria-hidden="true"
            />
            {care.storage}
          </li>
          <li className="flex gap-2">
            <Clock
              className="size-4 shrink-0 text-teal-deep"
              aria-hidden="true"
            />
            {care.shelfLife}
          </li>
          <li className="flex gap-2">
            <TriangleAlert
              className="size-4 shrink-0 text-coral-deep"
              aria-hidden="true"
            />
            <span>
              <span className="font-bold">Алергени: </span>
              {care.allergens.join(", ")}.
            </span>
          </li>
        </ul>
      </Collapse>
    </div>
  );
}
