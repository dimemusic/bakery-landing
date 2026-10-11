"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CircleAlert,
  CircleCheckBig,
  Store,
  Truck,
} from "lucide-react";
import { useCart, type CartLine } from "../lib/cart";
import { deliveryCost, type DeliveryMethod } from "../lib/delivery";
import { formatPrice } from "../lib/format";
import { CAFES, DELIVERY_FEE, FREE_DELIVERY_FROM } from "../lib/site";
import { useMounted } from "../lib/useMounted";
import {
  btnOutline,
  btnPrimary,
  focusRing,
  sectionTitle,
  sticker,
} from "../lib/ui";
import EmptyCart from "./EmptyCart";
import OrderSummary from "./OrderSummary";

// Checkout: simple form, client-side validation, fake success screen. No payments, nothing is sent.

type Values = {
  name: string;
  phone: string;
  method: DeliveryMethod;
  cafe: string;
  address: string;
  comment: string;
};
type FieldName = "name" | "phone" | "address" | "cafe";
type Errors = Partial<Record<FieldName, string>>;

type Order = {
  number: string;
  values: Values;
  lines: CartLine[];
  count: number;
  subtotal: number;
  delivery: number;
};

const INITIAL: Values = {
  name: "",
  phone: "",
  method: "delivery",
  cafe: "",
  address: "",
  comment: "",
};

/** Order of the fields on screen, used to focus the first invalid one. */
const FIELD_ORDER: FieldName[] = ["name", "phone", "address", "cafe"];

function validate(v: Values): Errors {
  const e: Errors = {};

  const name = v.name.trim();
  if (name.length < 2) e.name = "Вкажіть ім’я — щонайменше 2 літери";
  else if (!/^[\p{L}][\p{L}\s'’ʼ-]*$/u.test(name))
    e.name = "Ім’я може містити лише літери, пробіли та дефіс";

  const digits = v.phone.replace(/\D/g, "");
  const phoneOk =
    (digits.length === 12 && digits.startsWith("380")) ||
    (digits.length === 10 && digits.startsWith("0"));
  if (!digits) e.phone = "Вкажіть номер телефону";
  else if (!phoneOk) e.phone = "Введіть номер у форматі +380 XX XXX XX XX";

  if (v.method === "delivery") {
    if (v.address.trim().length < 6)
      e.address = "Вкажіть адресу: вулиця, будинок, квартира";
  } else if (!v.cafe) {
    e.cafe = "Оберіть кафе, з якого заберете замовлення";
  }

  return e;
}

/** Demo order number. Lives outside the component because it reads the clock. */
function newOrderNumber() {
  return `KR-${String(Date.now()).slice(-6)}`;
}

const inputClass = (invalid: boolean) =>
  `min-h-14 w-full rounded-2xl border-2 bg-cream px-4 text-lg leading-6 text-brown placeholder:text-brick-soft transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brick-deep ${
    invalid ? "border-coral-deep" : "border-brick-soft hover:border-brick"
  }`;

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-lg leading-6 font-bold text-brick-deep"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-coral-deep">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-2 text-base leading-6 font-bold text-coral-deep"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : (
        hint && (
          <p
            id={`${id}-hint`}
            className="mt-2 text-sm leading-5 text-brick-deep"
          >
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export default function CheckoutView() {
  const { lines, count, subtotal, clear } = useCart();
  const mounted = useMounted();
  const [values, setValues] = useState<Values>(INITIAL);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );
  const [attempted, setAttempted] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (order) successHeading.current?.focus();
  }, [order]);

  const errors = validate(values);
  const visible = (f: FieldName) =>
    touched[f] || attempted ? errors[f] : undefined;
  const hasErrors = Object.keys(errors).length > 0;

  const set = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((v) => ({ ...v, [key]: value }));
  const blur = (f: FieldName) => setTouched((t) => ({ ...t, [f]: true }));
  const aria = (f: FieldName, hint?: boolean) => ({
    "aria-invalid": visible(f) ? true : undefined,
    "aria-describedby": visible(f)
      ? `co-${f}-error`
      : hint
        ? `co-${f}-hint`
        : undefined,
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    const firstInvalid = FIELD_ORDER.find((f) => errors[f]);
    if (firstInvalid) {
      document.getElementById(`co-${firstInvalid}`)?.focus();
      return;
    }
    setOrder({
      number: newOrderNumber(),
      values,
      lines,
      count,
      subtotal,
      delivery: deliveryCost(subtotal, values.method),
    });
    clear(); // the cart is emptied; the snapshot above is what the success screen shows
  };

  /* ---------- success ---------- */
  if (order) {
    const { values: v } = order;
    const firstName = v.name.trim().split(/\s+/)[0];
    return (
      <div className="wrap py-12 md:py-16">
        <section aria-labelledby="success-title" className="mx-auto max-w-3xl">
          <div className={`p-6 text-center sm:p-12 ${sticker}`}>
            <div className="mx-auto grid size-24 place-items-center rounded-full border-2 border-brick bg-teal text-teal-ink">
              <CircleCheckBig className="size-12" aria-hidden="true" />
            </div>
            <h1
              ref={successHeading}
              tabIndex={-1}
              id="success-title"
              className="mt-6 font-heading text-4xl leading-10 text-brick outline-none sm:text-5xl sm:leading-[3.5rem]"
            >
              Дякуємо, {firstName}!
            </h1>
            <p className="mt-3 text-xl leading-8 font-bold text-brick-deep">
              Замовлення №{order.number} прийнято
            </p>
            <p className="mx-auto mt-3 max-w-xl text-lg leading-8 text-brown">
              {v.method === "delivery"
                ? `Привеземо за адресою: ${v.address.trim()}.`
                : `Чекаємо вас у кафе: ${v.cafe}.`}{" "}
              Ми зателефонуємо на {v.phone.trim()}, щоб підтвердити деталі.
            </p>

            <div className="mt-8 rounded-2xl border-2 border-dashed border-brick-soft bg-cream p-4 text-left sm:p-6">
              <ul className="space-y-2 text-base leading-6 text-brick-deep">
                {order.lines.map((l) => (
                  <li key={l.key} className="flex justify-between gap-4">
                    <span className="min-w-0">
                      {l.product.name}
                      {l.size ? ` (${l.size.label})` : ""} × {l.qty}
                    </span>
                    <span className="shrink-0 font-bold">
                      {formatPrice(l.price)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1 border-t-2 border-dashed border-brick-soft/60 pt-4 text-base leading-6 text-brick-deep">
                <p className="flex justify-between">
                  <span>
                    {v.method === "pickup" ? "Самовивіз" : "Доставка"}
                  </span>
                  <span className="font-bold">
                    {order.delivery === 0
                      ? "Безкоштовно"
                      : formatPrice(order.delivery)}
                  </span>
                </p>
                <p className="flex items-end justify-between text-lg">
                  <span className="font-bold">Разом</span>
                  <span className="font-heading text-3xl leading-10 text-brick">
                    {formatPrice(order.subtotal + order.delivery)}
                  </span>
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-5 text-brick-deep">
              Це демонстраційна версія: замовлення нікуди не надсилається,
              оплата не проводиться.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/" className={btnPrimary}>
                На головну
              </Link>
              <Link href="/#menu" className={btnOutline}>
                Обрати ще
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ---------- checkout ---------- */
  const submitButton = (
    <button
      type="submit"
      form="checkout-form"
      className={`w-full min-h-16 text-xl ${btnPrimary}`}
    >
      Підтвердити замовлення
    </button>
  );

  return (
    <div className="wrap py-12 md:py-16">
      <Link
        href="/cart"
        className={`group inline-flex min-h-12 items-center gap-2 rounded-lg px-2 text-lg leading-6 font-bold text-brick-deep underline decoration-dashed underline-offset-4 hover:text-coral-deep ${focusRing}`}
      >
        <ArrowLeft
          className="size-6 transition-transform group-hover:-translate-x-1"
          aria-hidden="true"
        />
        Назад до кошика
      </Link>

      <h1 className={`mt-4 ${sectionTitle}`}>Оформлення замовлення</h1>

      {!mounted ? (
        <div
          aria-busy="true"
          className="mt-10 h-64 rounded-[1.5rem] border-2 border-dashed border-brick-soft/50 bg-peach/40"
        />
      ) : lines.length === 0 ? (
        <EmptyCart
          title="Кошик порожній"
          text="Щоб оформити замовлення, додайте солодощі в кошик."
        />
      ) : (
        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] xl:gap-12">
          <form
            id="checkout-form"
            noValidate
            onSubmit={onSubmit}
            className="space-y-10"
          >
            {attempted && hasErrors && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-2xl border-2 border-coral-deep bg-cream p-4 text-lg leading-6 font-bold text-coral-deep"
              >
                <CircleAlert
                  className="mt-0.5 size-6 shrink-0"
                  aria-hidden="true"
                />
                Є помилки у формі — перевірте виділені поля.
              </div>
            )}

            <section aria-labelledby="co-contacts" className="space-y-6">
              <h2
                id="co-contacts"
                className="font-heading text-3xl leading-10 text-brick"
              >
                Контакти
              </h2>
              <Field id="co-name" label="Ім’я" required error={visible("name")}>
                <input
                  id="co-name"
                  type="text"
                  autoComplete="name"
                  aria-required="true"
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  onBlur={() => blur("name")}
                  placeholder="Олена"
                  className={inputClass(!!visible("name"))}
                  {...aria("name")}
                />
              </Field>
              <Field
                id="co-phone"
                label="Телефон"
                required
                hint="Зателефонуємо, щоб підтвердити замовлення"
                error={visible("phone")}
              >
                <input
                  id="co-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-required="true"
                  value={values.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  onBlur={() => blur("phone")}
                  placeholder="+380 XX XXX XX XX"
                  className={inputClass(!!visible("phone"))}
                  {...aria("phone", true)}
                />
              </Field>
            </section>

            <fieldset className="space-y-4">
              <legend className="font-heading text-3xl leading-10 text-brick">
                Як отримати замовлення?
              </legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {(
                  [
                    {
                      value: "delivery",
                      icon: Truck,
                      title: "Доставка",
                      text: `Кур’єр привезе за вашою адресою. Від ${FREE_DELIVERY_FROM} грн — безкоштовно, інакше ${DELIVERY_FEE} грн.`,
                    },
                    {
                      value: "pickup",
                      icon: Store,
                      title: "Самовивіз із кафе",
                      text: "Заберіть замовлення у зручному кафе — безкоштовно.",
                    },
                  ] as const
                ).map(({ value, icon: Icon, title, text }) => {
                  const selected = values.method === value;
                  return (
                    <label key={value} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="method"
                        value={value}
                        checked={selected}
                        onChange={() => set("method", value)}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex h-full items-start gap-4 rounded-2xl border-2 p-4 transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brick-deep ${
                          selected
                            ? "border-brick bg-peach"
                            : "border-brick-soft bg-cream hover:border-brick"
                        }`}
                      >
                        <Icon
                          className="size-8 shrink-0 text-teal-deep"
                          aria-hidden="true"
                        />
                        <span>
                          <span className="block text-lg leading-6 font-bold text-brick-deep">
                            {title}
                          </span>
                          <span className="mt-1 block text-base leading-6 text-brick-deep">
                            {text}
                          </span>
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>

              {values.method === "delivery" ? (
                <Field
                  id="co-address"
                  label="Адреса доставки"
                  required
                  hint="Вулиця, будинок, квартира, під’їзд"
                  error={visible("address")}
                >
                  <input
                    id="co-address"
                    type="text"
                    autoComplete="street-address"
                    aria-required="true"
                    value={values.address}
                    onChange={(e) => set("address", e.target.value)}
                    onBlur={() => blur("address")}
                    className={inputClass(!!visible("address"))}
                    {...aria("address", true)}
                  />
                </Field>
              ) : (
                <Field
                  id="co-cafe"
                  label="Кафе для самовивозу"
                  required
                  error={visible("cafe")}
                >
                  <select
                    id="co-cafe"
                    aria-required="true"
                    value={values.cafe}
                    onChange={(e) => set("cafe", e.target.value)}
                    onBlur={() => blur("cafe")}
                    className={inputClass(!!visible("cafe"))}
                    {...aria("cafe")}
                  >
                    <option value="">Оберіть кафе</option>
                    {CAFES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            </fieldset>

            <Field
              id="co-comment"
              label="Коментар до замовлення"
              hint="Наприклад: без горіхів, зателефонуйте перед приїздом"
            >
              <textarea
                id="co-comment"
                rows={3}
                maxLength={300}
                value={values.comment}
                onChange={(e) => set("comment", e.target.value)}
                className={`${inputClass(false)} min-h-28 py-3`}
                aria-describedby="co-comment-hint"
              />
            </Field>

            <p className="text-base leading-6 text-brick-deep">
              Онлайн-оплати поки немає: розрахунок під час отримання.
            </p>

            <div className="lg:hidden">{submitButton}</div>
          </form>

          <OrderSummary
            subtotal={subtotal}
            count={count}
            method={values.method}
            lines={lines}
          >
            <div className="mt-6 hidden lg:block">{submitButton}</div>
          </OrderSummary>
        </div>
      )}
    </div>
  );
}
