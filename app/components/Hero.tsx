import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, PhoneCall } from "lucide-react";
import { HOURS, PHONES, SHOPS, YEARS } from "../lib/site";
import { focusRing } from "../lib/ui";
import { LogoMark, Sparkle, Squiggle, Steam } from "./Doodles";
import ProductArt from "./ProductArt";

// Sizing: rem only, on an 8pt grid (1 Tailwind step = 4px at the 16px root, so use even steps).
// Icons are 24px (size-6); 2px borders and a few 4px nudges are the only sub-grid values.
// The root font-size steps up with the viewport (globals.css), so all of this scales like zoom.

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const cta = `group inline-flex min-h-16 3xl:min-h-18 items-center justify-center gap-2 rounded-2xl px-6 text-xl leading-8 font-bold whitespace-nowrap transition duration-200 hover:-translate-y-0.5 active:translate-y-0.5 ${focusRing}`;
const ctaPrimary = `${cta} bg-brick text-cream shadow-sticker hover:bg-brick-deep active:shadow-none`;
const ctaOutline = `${cta} border-2 border-brick bg-cream text-brick-deep hover:bg-peach`;

/** Round cream sticker holding a little cartoon pastry; floats gently. */
const sticker =
  "animate-float absolute z-10 grid place-items-center rounded-full border-2 border-dashed border-brick-soft bg-cream shadow-sticker";

// First-screen fit: the hero is at least (viewport - header 4.5rem - marquee 3.75rem) tall, so the whole
// marquee strip is visible at the bottom of the first screen. If the header or marquee height changes, update both.
export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="hero-bg relative flex min-h-[calc(100svh-4.5rem-3.75rem)] items-center overflow-hidden"
    >
      <div className="wrap relative grid grid-cols-1 items-center gap-12 py-10 md:py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:py-10 3xl:py-14">
        <div>
          <p
            className="reveal inline-flex items-center gap-2 rounded-2xl bg-brick px-6 py-2 text-base leading-6 font-bold text-cream"
            style={delay(0)}
          >
            <Sparkle className="size-4 text-peach" />
            Кафе з власною пекарнею
          </p>

          <h1
            id="hero-title"
            className="reveal mt-4 font-heading text-[2.5rem] leading-[3rem] text-brick uppercase sm:text-[3.5rem] sm:leading-[4rem] xl:text-[4rem] xl:leading-[4.5rem] 3xl:mt-8 3xl:text-[4.5rem] 3xl:leading-[5rem]"
            style={delay(80)}
          >
            Кава, булочки й&nbsp;усе, що{" "}
            <span className="whitespace-nowrap">
              пахне{" "}
              <span className="relative inline-block text-coral-deep">
                домом
                <Squiggle className="absolute -bottom-2 left-0 h-2 w-full text-coral" />
              </span>
            </span>
          </h1>

          <p
            className="reveal mt-4 max-w-[36rem] text-xl leading-normal text-brown 3xl:mt-8 3xl:max-w-[40rem] 3xl:text-[1.375rem]"
            style={delay(160)}
          >
            Крендель — затишне кафе, де торти, печиво, тістечка й десерти печуть
            на місці щоранку вже {YEARS}&nbsp;років. Заходьте посидіти за кавою
            або замовляйте доставку.
          </p>

          <div
            className="reveal mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap 3xl:mt-10"
            style={delay(240)}
          >
            <a href="#menu" className={ctaPrimary}>
              Обрати солодощі
              <ArrowRight
                className="size-6 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a href="#contacts" className={ctaOutline}>
              <MapPin className="size-6" aria-hidden="true" />
              Завітати в кафе
            </a>
          </div>

          <ul
            className="reveal mt-6 3xl:mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t-2 border-dashed border-brick-soft/60 pt-4 3xl:pt-6 text-lg leading-6 font-bold text-brick-deep 3xl:text-xl 3xl:leading-8"
            style={delay(320)}
          >
            <li className="flex min-h-12 items-center gap-2">
              <Calendar
                className="size-6 shrink-0 text-brick-soft"
                aria-hidden="true"
              />
              <span>
                {HOURS.days}{" "}
                <span aria-hidden="true" className="text-brick-soft/60">
                  |
                </span>{" "}
                {HOURS.time}
              </span>
            </li>
            <li>
              <a
                href={`tel:${PHONES[0].replace(/\s/g, "")}`}
                className={`flex min-h-12 items-center gap-2 rounded-lg hover:underline ${focusRing}`}
              >
                <PhoneCall
                  className="size-6 shrink-0 text-brick-soft"
                  aria-hidden="true"
                />
                {PHONES[0]}
              </a>
            </li>
          </ul>
        </div>

        {/* Photo card with pastry stickers on its corners */}
        <div
          className="reveal relative mx-auto w-full max-w-[40rem] lg:max-w-none"
          style={delay(200)}
        >
          <Steam className="absolute -top-10 left-[38%] z-10 h-12 w-16 text-brick-soft/70 sm:h-16 sm:w-24" />

          <div
            className="hover-wobble relative -rotate-2 rounded-[2rem_1.5rem_2rem_1.5rem] border-2 border-dashed border-brick-soft bg-peach p-4 shadow-sticker-lg"
            style={{ "--r": "-2deg" } as CSSProperties}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-brick lg:aspect-square 3xl:aspect-[3/4]">
              <Image
                src="/images/hero-bakery.jpg"
                alt="Вітрина кондитерської з рядами свіжої випічки та тістечок"
                fill
                preload
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 640px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 pr-24 pl-14 text-left text-base leading-6 font-bold text-brick-deep sm:pr-32 sm:pl-24 sm:text-lg">
              Вітрина нашої пекарні: свіже щоранку
            </p>
          </div>

          {/* stickers: top-left, top-right, bottom-left (bottom-right holds the badge) */}
          <div
            className={`${sticker} -top-6 -left-2 size-16 -rotate-12 sm:-top-8 sm:-left-6 sm:size-24 lg:size-[6.5rem]`}
          >
            <ProductArt kind="cake" className="size-[78%]" />
          </div>
          <div
            className={`${sticker} -top-6 -right-2 size-[4.5rem] rotate-12 [animation-delay:-2s] sm:-top-8 sm:-right-6 sm:size-[6.5rem] lg:size-28`}
          >
            <LogoMark className="size-[80%]" />
          </div>
          <div
            className={`${sticker} -bottom-6 -left-2 size-14 rotate-6 [animation-delay:-3.5s] sm:-bottom-8 sm:-left-6 sm:size-20 lg:size-24`}
          >
            <ProductArt kind="cookie" className="size-[78%]" />
          </div>

          <div className="animate-float absolute -right-2 -bottom-8 z-10 grid size-[6.5rem] rotate-6 place-items-center rounded-full border-2 border-dashed border-brick-soft bg-coral p-2 text-center shadow-sticker [animation-delay:-1s] sm:-right-4 sm:size-32">
            <p className="font-heading text-sm leading-tight text-ink uppercase sm:text-base">
              <span className="block text-[2.5rem] leading-[2.5rem] sm:text-5xl sm:leading-[3rem]">
                {SHOPS}
              </span>
              кафе
              <br />в місті
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
