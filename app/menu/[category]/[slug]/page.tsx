import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Flame, Thermometer, type LucideIcon } from "lucide-react";
import AllergenBadges from "../../../components/AllergenBadges";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ProductArt from "../../../components/ProductArt";
import ProductBuyBox from "../../../components/ProductBuyBox";
import ProductCard from "../../../components/ProductCard";
import {
  PRODUCTS,
  categoryHref,
  getCategory,
  getProduct,
  mayContain,
  relatedProducts,
} from "../../../lib/products";
import { focusRing, sectionTitle, sticker } from "../../../lib/ui";

type Params = Promise<{ category: string; slug: string }>;

/** Every product is prerendered. Unknown slugs (or a slug under the wrong category) 404. */
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ category: p.category, slug: p.slug }));
}

async function load(params: Params) {
  const { category, slug } = await params;
  const product = getProduct(slug);
  if (!product || product.category !== category) return null;
  const cat = getCategory(product.category);
  return cat ? { product, category: cat } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const found = await load(params);
  if (!found) return {};
  const { product, category } = found;
  return {
    title: `${product.name} — ${category.name}`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.image.src],
    },
  };
}

const h2 = "font-heading text-3xl leading-10 text-brick";

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className={`flex gap-4 p-4 ${sticker}`}>
      <Icon
        className="mt-1 size-6 shrink-0 text-teal-deep"
        aria-hidden="true"
      />
      <div>
        <dt className="text-base leading-6 font-bold text-brick-deep">
          {label}
        </dt>
        <dd className="mt-1 text-lg leading-6 text-brown">{value}</dd>
      </div>
    </div>
  );
}

async function ProductContent({ params }: { params: Params }) {
  const found = await load(params);
  if (!found) notFound();
  const { product, category } = found;
  const traces = mayContain(product);
  const related = relatedProducts(product, 3);
  const photoId = `photo-${product.slug}`;

  return (
    <>
      <div className="wrap page-enter section-y">
        <Breadcrumbs
          items={[
            { label: "Меню", href: "/#menu" },
            { label: category.name, href: categoryHref(category.id) },
            { label: product.name },
          ]}
        />

        {/* ---------- top: photo + buy box ---------- */}
        <div className="mt-6 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="-rotate-1 rounded-[2rem_1.5rem_2rem_1.5rem] border-2 border-dashed border-brick-soft bg-peach p-4 shadow-sticker-lg">
              <div
                id={photoId}
                className="zoom-on-hover relative aspect-square overflow-hidden rounded-2xl border-2 border-brick"
              >
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div
              aria-hidden="true"
              className="animate-float absolute -top-4 -left-4 grid size-20 place-items-center rounded-full border-2 border-dashed border-brick-soft bg-cream shadow-sticker"
            >
              <ProductArt kind={category.art} className="size-14" />
            </div>
          </div>

          <div>
            <Link
              href={categoryHref(category.id)}
              className={`inline-flex h-10 items-center rounded-full bg-brick px-4 text-base leading-6 font-bold text-cream transition-colors hover:bg-brick-deep ${focusRing}`}
            >
              {category.name}
            </Link>
            <h1 className={`mt-4 ${sectionTitle}`}>{product.name}</h1>
            <p className="mt-4 text-xl leading-8 text-brown">
              {product.shortDescription}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 text-base leading-6 font-bold text-brick-deep">
              {!product.sizes && (
                <li className="inline-flex h-10 items-center rounded-full border-2 border-dashed border-brick-soft px-4">
                  {product.weight}
                </li>
              )}
              <li className="inline-flex h-10 items-center rounded-full border-2 border-dashed border-brick-soft px-4">
                {product.kcalPer100g} ккал / 100 г
              </li>
            </ul>
            <div className="mt-8">
              <ProductBuyBox product={product} photoId={photoId} />
            </div>
          </div>
        </div>

        {/* ---------- details ---------- */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
          <div className="space-y-12">
            <section aria-labelledby="about-title">
              <h2 id="about-title" className={h2}>
                Про смак
              </h2>
              <p className="mt-4 max-w-[40rem] text-xl leading-8 text-brown">
                {product.longDescription}
              </p>
            </section>

            <section aria-labelledby="ingredients-title">
              <h2 id="ingredients-title" className={h2}>
                Склад
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <li
                    key={ing}
                    className="reveal inline-flex h-10 items-center rounded-full bg-cream px-4 text-base leading-6 text-brown ring-2 ring-peach"
                    style={{ "--delay": `${i * 60}ms` } as CSSProperties}
                  >
                    {ing}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="allergens-title">
              <h2 id="allergens-title" className={h2}>
                Алергени
              </h2>
              <h3 className="mt-4 text-lg leading-6 font-bold text-brick-deep">
                Містить
              </h3>
              <div className="mt-2">
                <AllergenBadges allergens={product.allergens} kind="contains" />
              </div>
              {traces.length > 0 && (
                <>
                  <h3 className="mt-6 text-lg leading-6 font-bold text-brick-deep">
                    Може містити сліди
                  </h3>
                  <div className="mt-2">
                    <AllergenBadges
                      allergens={traces}
                      kind="may-contain"
                      startDelay={product.allergens.length * 70}
                    />
                  </div>
                </>
              )}
              <p className="mt-4 text-base leading-6 text-brick-deep">
                Склад і алергени на сайті демонстраційні — уточнюйте в кафе
                перед замовленням.
              </p>
            </section>
          </div>

          <dl className="space-y-4 lg:pt-14">
            <Fact
              icon={Thermometer}
              label="Зберігання"
              value={product.storage}
            />
            <Fact
              icon={Clock}
              label="Термін придатності"
              value={product.shelfLife}
            />
            <Fact
              icon={Flame}
              label="Калорійність"
              value={`${product.kcalPer100g} ккал на 100 г`}
            />
          </dl>
        </div>

        {/* ---------- also try ---------- */}
        <section aria-labelledby="related-title" className="mt-16">
          <h2 id="related-title" className={h2}>
            Також спробуйте
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {related.map((p) => {
              const c = getCategory(p.category);
              return c ? (
                <ProductCard
                  key={p.slug}
                  category={c}
                  products={[p]}
                  mode="product"
                />
              ) : null;
            })}
          </div>
        </section>
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

export default function ProductPage({ params }: { params: Params }) {
  return (
    <main id="main-content" className="flex-1">
      <ProductContent params={params} />
    </main>
  );
}
