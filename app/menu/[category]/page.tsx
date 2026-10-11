import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import { positionsLabel } from "../../lib/format";
import ProductCard from "../../components/ProductCard";
import {
  CATEGORIES,
  categoryHref,
  findCategory,
  productsInCategory,
} from "../../lib/products";
import { focusRing, sectionTitle } from "../../lib/ui";

type Params = Promise<{ category: string }>;

/** All categories are prerendered. Unknown ones 404 (dynamicParams is unavailable with Cache Components). */
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const category = findCategory((await params).category);
  if (!category) return {};
  return {
    title: category.name,
    description: category.intro,
    openGraph: {
      title: category.name,
      description: category.intro,
      images: [category.cover.src],
    },
  };
}

async function CategoryContent({ params }: { params: Params }) {
  const category = findCategory((await params).category);
  if (!category) notFound();
  const products = productsInCategory(category.id);
  const others = CATEGORIES.filter((c) => c.id !== category.id);

  return (
    <>
      <div className="wrap page-enter section-y">
        <Breadcrumbs
          items={[{ label: "Меню", href: "/#menu" }, { label: category.name }]}
        />

        <header className="mt-6 max-w-3xl">
          <h1 className={sectionTitle}>{category.name}</h1>
          <p className="mt-4 text-xl leading-8 text-brown">{category.intro}</p>
          <p className="mt-2 text-base leading-6 font-bold text-brick-deep">
            {positionsLabel(products.length)} у меню
          </p>
        </header>

        <div className="section-head-gap grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
          {products.map((p, i) => (
            <ProductCard
              key={p.slug}
              category={category}
              products={[p]}
              mode="product"
              priority={i < 2}
            />
          ))}
        </div>

        <nav aria-labelledby="other-cats" className="mt-16">
          <h2
            id="other-cats"
            className="font-heading text-2xl leading-8 text-brick"
          >
            Інші смаколики
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((c) => (
              <li key={c.id}>
                <Link
                  href={categoryHref(c.id)}
                  className={`inline-flex h-12 items-center rounded-full border-2 border-brick-soft bg-cream px-6 text-lg leading-6 font-bold text-brick-deep transition-colors hover:border-brick hover:bg-peach ${focusRing}`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

/**
 * All real paths come from generateStaticParams and are fully prerendered, so navigating to them
 * is instant anyway. Only unknown params block, and for those notFound() must run before
 * streaming starts so the response is a real 404 (inside <Suspense> it would be a 200 "soft 404").
 * `instant = false` is Next’s documented opt-out for a segment that is allowed to block.
 */
export const instant = false;

export default function CategoryPage({ params }: { params: Params }) {
  return (
    <main id="main-content" className="flex-1">
      <CategoryContent params={params} />
    </main>
  );
}
