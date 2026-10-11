import { Calendar, MapPin, PhoneCall } from "lucide-react";
import {
  BRAND,
  DELIVERY_ZONE,
  HOURS,
  MESSENGERS,
  PHONES,
  SHOPS,
  TAGLINE,
  YEARS,
} from "../lib/site";
import { LogoMark } from "./Doodles";

const link =
  "rounded underline decoration-dashed underline-offset-4 hover:text-peach focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-peach";

export default function Footer() {
  return (
    <footer
      id="contacts"
      className="border-t-4 border-dashed border-brick-soft bg-brick text-cream"
    >
      <div className="wrap grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-heading text-3xl">
            <LogoMark className="h-10 w-10 -rotate-6" />
            {BRAND}
          </p>
          <p className="mt-3 max-w-xs">
            {TAGLINE}. Печемо вручну вже {YEARS} років.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl">Телефонуйте</h2>
          <ul className="mt-3 space-y-1">
            {PHONES.map((p, i) => (
              <li key={i}>
                <a
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className={`inline-flex min-h-11 items-center gap-2 font-bold ${link}`}
                >
                  <PhoneCall size={18} aria-hidden="true" />
                  {p}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-peach">Пишіть: {MESSENGERS.join(", ")}</p>
        </div>

        <div>
          <h2 className="font-heading text-xl">Працюємо</h2>
          <p className="mt-3 flex items-center gap-2 font-bold">
            <Calendar size={18} aria-hidden="true" />
            {HOURS.days} · {HOURS.time}
          </p>
          <p className="mt-2 text-peach">
            {SHOPS} кафе в місті — телефонуйте, підкажемо найближче.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl">Зона доставки</h2>
          <p className="mt-3 flex gap-2">
            <MapPin size={18} aria-hidden="true" className="mt-1 shrink-0" />
            {DELIVERY_ZONE}
          </p>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-cream/30">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-5 text-base text-peach">
          <p>© {BRAND}. Спечено з любов’ю.</p>
          <p>Склад і алергени на сайті демонстраційні.</p>
          <a
            href="#main-content"
            className={`inline-flex min-h-11 items-center ${link}`}
          >
            Нагору
          </a>
        </div>
      </div>
    </footer>
  );
}
