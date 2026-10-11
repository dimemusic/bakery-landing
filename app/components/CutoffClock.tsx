"use client";

import { useSyncExternalStore } from "react";
import { Clock } from "lucide-react";
import { CUTOFF_HOUR, TIMEZONE } from "../lib/site";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 20_000);
  return () => clearInterval(id);
};
// Whole minutes since epoch: stable between calls, changes once a minute.
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIMEZONE,
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});

function kyivMinutes(minuteSinceEpoch: number) {
  const parts = fmt.formatToParts(new Date(minuteSinceEpoch * 60_000));
  const h = Number(parts.find((p) => p.type === "hour")?.value);
  const m = Number(parts.find((p) => p.type === "minute")?.value);
  return h * 60 + m;
}

/** Live "time left to order for same-day dispatch". Server render shows a static line (no hydration mismatch). */
export default function CutoffClock() {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);

  let text = `Замовили до ${CUTOFF_HOUR}:00 — дуже ймовірно, привеземо цього ж дня`;
  if (minute !== null) {
    const left = CUTOFF_HOUR * 60 - kyivMinutes(minute);
    if (left > 0) {
      const h = Math.floor(left / 60);
      const m = left % 60;
      text = `До ${CUTOFF_HOUR}:00 ще ${h > 0 ? `${h} год ` : ""}${m} хв — встигаєте на сьогодні`;
    } else {
      text = `Сьогодні ${CUTOFF_HOUR}:00 уже позаду — привеземо завтра. Зате кошик можна наповнити вже зараз`;
    }
  }

  return (
    <p
      role="status"
      className="mx-auto flex w-fit max-w-full items-center gap-3 rounded-2xl border-2 border-dashed border-teal-deep bg-ice px-5 py-3 text-left font-bold text-teal-deep"
    >
      <Clock size={22} aria-hidden="true" className="shrink-0" />
      {text}
    </p>
  );
}
