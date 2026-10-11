import { CATEGORIES, productsInCategory } from "../lib/products";
import { sectionTitle } from "../lib/ui";
import { CakeSlice, Cookie } from "./BakeryDoodles";
import ProductCard from "./ProductCard";

export default function Menu() {
  return (
    <section
      id="menu"
      aria-labelledby="menu-title"
      className="relative overflow-hidden section-y"
    >
      <Cookie className="pointer-events-none absolute -left-6 top-12 hidden h-auto w-[130px] rotate-12 opacity-40 md:block" />
      <CakeSlice className="pointer-events-none absolute -right-4 top-10 hidden h-auto w-[150px] -rotate-6 opacity-40 lg:block" />

      <div className="wrap relative">
        <div className="rv max-w-3xl">
          <h2 id="menu-title" className={sectionTitle}>
            Що сьогодні <span className="text-coral-deep">випекли</span>
          </h2>
          <p className="mt-5 text-xl text-brown">
            Оберіть смак — опис і ціна підлаштуються. Натискайте «У кошик» —
            замовлення збереться в кошику, який можна відкрити в будь-який
            момент.
          </p>
        </div>

        <div className="section-head-gap grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
          {CATEGORIES.map((c, i) => (
            <ProductCard
              key={c.id}
              category={c}
              products={productsInCategory(c.id)}
              priority={i < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
