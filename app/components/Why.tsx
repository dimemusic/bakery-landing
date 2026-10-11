import Image from "next/image";
import { ChefHat, Gift, Heart } from "lucide-react";
import { CATEGORIES } from "../lib/products";
import { SHOPS, YEARS } from "../lib/site";
import { sectionTitle } from "../lib/ui";
import { Croissant, Whisk } from "./BakeryDoodles";
import CountUp from "./CountUp";
import { Sparkle } from "./Doodles";

const STATS = [
  { value: YEARS, label: "років печемо" },
  { value: SHOPS, label: "кафе в місті" },
  { value: CATEGORIES.length, label: "видів солодощів" },
];

const FEATURES = [
  {
    icon: ChefHat,
    title: "Печемо щодня",
    text: "Нічого не лежить тижнями: свіже тісто, свіжий крем і ранок, який починається о четвертій на кухні.",
  },
  {
    icon: Heart,
    title: "Бабусині зошити",
    text: "Пропорції — з пожовклих сторінок із плямами від олії та меду. Ми лише додали духовки поновіше.",
  },
  {
    icon: Gift,
    title: "Пакуємо як подарунок",
    text: "Кожна коробка — акуратно, зі стрічкою і турботою. Навіть якщо подарунок — для себе.",
  },
];

export default function Why() {
  return (
    <section
      id="about"
      aria-labelledby="why-title"
      className="relative overflow-hidden border-t-2 border-dashed border-brick-soft/50 section-y"
    >
      <Croissant className="pointer-events-none absolute -right-4 top-8 hidden h-auto w-[150px] rotate-12 opacity-40 lg:block" />
      <Whisk className="pointer-events-none absolute -left-2 bottom-24 hidden h-auto w-[120px] opacity-40 xl:block" />
      <div className="wrap relative">
        <h2 id="why-title" className={`rv text-center ${sectionTitle}`}>
          Чому до нас <span className="text-coral-deep">повертаються</span>
        </h2>

        <dl className="rv section-head-gap mx-auto grid max-w-4xl grid-cols-3 text-center">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-2 ${i > 0 ? "border-l-2 border-dashed border-brick-soft/60" : ""}`}
            >
              <dd className="font-heading text-5xl text-coral-deep sm:text-7xl">
                <CountUp to={s.value} />
              </dd>
              <dt className="mt-1 font-heading text-base text-brick uppercase sm:text-xl">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <figure className="rv relative">
            <blockquote className="relative rounded-[26px_22px_28px_24px] border-2 border-dashed border-brick-soft bg-peach p-7 text-xl text-brick-deep shadow-sticker sm:p-9 sm:text-2xl">
              Печемо за{" "}
              <strong className="font-bold text-coral-deep">
                перевіреними родинними рецептами
              </strong>{" "}
              й пакуємо в коробки — просто до ваших дверей. Вам лишається
              поставити чайник. І покликати всіх до столу.
              <span
                aria-hidden="true"
                className="absolute -bottom-3 left-10 size-6 rotate-45 border-r-2 border-b-2 border-dashed border-brick-soft bg-peach"
              />
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 pl-6 font-heading text-lg text-brick uppercase">
              <span className="grid size-11 place-items-center rounded-full bg-brick text-cream">
                К
              </span>
              Команда «Кренделя»
            </figcaption>
          </figure>

          <div className="rv relative mx-auto w-full max-w-[560px]">
            <Sparkle className="absolute -top-2 right-4 h-7 w-7 text-coral" />
            <Image
              src="/images/family.png"
              alt="Мама, тато й донька готують разом: розкачують тісто, збивають крем, вирізають сердечко"
              width={876}
              height={586}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="hover-wobble w-full rounded-[28px] border-2 border-dashed border-brick-soft shadow-sticker"
            />
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="rv hover-wobble rounded-[24px_20px_26px_22px] border-2 border-brick bg-cream p-7 text-center transition duration-200 hover:-translate-y-1 hover:shadow-sticker"
            >
              <Icon
                size={36}
                aria-hidden="true"
                className="mx-auto text-teal-deep"
              />
              <h3 className="mt-3 font-heading text-2xl text-teal-deep">
                {title}
              </h3>
              <p className="mt-2 text-lg text-brick-deep">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
