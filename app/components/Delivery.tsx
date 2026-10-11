import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CUTOFF_HOUR, MESSENGERS, PHONES } from "../lib/site";
import { focusRing, sectionTitle, sticker } from "../lib/ui";
import { Cupcake } from "./BakeryDoodles";
import CutoffClock from "./CutoffClock";

const ORDER_WAYS = [
  "Інстаграм",
  "На сайті",
  "За номером телефону",
  MESSENGERS.slice(1).join(" / "),
];

const num =
  "absolute -top-5 -left-2 grid size-12 place-items-center rounded-full bg-brick font-heading text-2xl text-cream";
const stepTitle = "font-heading text-2xl leading-tight text-brick uppercase";

export default function Delivery() {
  return (
    <section
      id="delivery"
      aria-labelledby="delivery-title"
      className="relative overflow-hidden border-t-2 border-dashed border-brick-soft/50 section-y"
    >
      <Cupcake className="pointer-events-none absolute -left-4 bottom-10 hidden h-auto w-[130px] -rotate-12 opacity-40 lg:block" />
      <div className="wrap relative">
        <h2 id="delivery-title" className={`rv text-center ${sectionTitle}`}>
          Як солодощі <span className="text-coral-deep">доїжджають</span> до вас
        </h2>
        <div className="rv section-head-gap text-center text-lg">
          <CutoffClock />
        </div>

        <ol className="mt-14 grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
          <li className={`rv relative flex flex-col gap-5 p-6 ${sticker}`}>
            <span className={`${num} -rotate-6`}>1</span>
            <div className="flex items-center gap-4">
              <Image
                src="/images/step-phone.png"
                alt=""
                aria-hidden="true"
                width={120}
                height={222}
                className="h-[120px] w-auto shrink-0"
              />
              <h3 className={stepTitle}>Оформлюєте замовлення</h3>
            </div>
            <ul className="list-disc space-y-1 pl-5 text-lg text-brick-deep marker:text-coral">
              {ORDER_WAYS.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <p className="text-base text-brick-deep">
              Або одразу телефонуйте: {PHONES[0]}
            </p>
          </li>

          <li className={`rv relative flex flex-col gap-5 p-6 ${sticker}`}>
            <span className={`${num} rotate-3`}>2</span>
            <div className="flex items-center gap-4">
              <Image
                src="/images/step-bag.png"
                alt=""
                aria-hidden="true"
                width={270}
                height={230}
                className="h-[110px] w-auto shrink-0 rounded-xl"
              />
              <h3 className={stepTitle}>Пакуємо ваше замовлення</h3>
            </div>
            <p className="text-lg text-brick-deep">
              Якщо оформити замовлення до {CUTOFF_HOUR}:00, дуже ймовірно, ми
              привеземо його{" "}
              <strong className="font-bold text-coral-deep">цього ж дня</strong>
              . Решту приймаємо — і печемо на ранок.
            </p>
          </li>

          <li className={`rv relative flex flex-col gap-5 p-6 ${sticker}`}>
            <span className={`${num} -rotate-3`}>3</span>
            <div className="flex items-center gap-4">
              <Image
                src="/images/step-car.png"
                alt=""
                aria-hidden="true"
                width={258}
                height={220}
                className="h-[110px] w-auto shrink-0 rounded-xl"
              />
              <h3 className={stepTitle}>Кур’єр їде до вас</h3>
            </div>
            <p className="text-lg text-brick-deep">
              Кур’єр везе{" "}
              <strong className="font-bold text-coral-deep">
                ваше замовлення акуратно
              </strong>{" "}
              і не поспішаючи, щоб тістечка доїхали красивими, а не «як вийшло».
            </p>
          </li>
        </ol>

        <p className="mt-12 text-center">
          <a
            href="#menu"
            className={`group inline-flex min-h-12 items-center gap-2 rounded-xl px-3 text-lg font-bold text-brick-deep underline decoration-dashed underline-offset-4 hover:text-coral-deep ${focusRing}`}
          >
            Назад до меню
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </p>
      </div>
    </section>
  );
}
