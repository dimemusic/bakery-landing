import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { btnPrimary, sectionTitle } from "./lib/ui";
import BoxArt from "./components/BoxArt";

export const metadata: Metadata = {
  title: "Сторінку не знайдено",
  robots: { index: false },
};

/** 404 in the site's voice (used for unknown categories and products too). */
export default function NotFound() {
  return (
    <main id="main-content" className="flex-1">
      <section className="wrap section-y text-center">
        <div className="mx-auto max-w-[20rem]">
          <BoxArt pieces={[]} />
        </div>
        <h1 className={`mt-10 ${sectionTitle}`}>Тут порожньо</h1>
        <p className="mx-auto mt-4 max-w-xl text-xl leading-8 text-brown">
          Такої сторінки немає — можливо, цей смаколик уже розібрали. Загляньте
          в меню, там точно щось знайдеться.
        </p>
        <Link href="/#menu" className={`mt-8 ${btnPrimary}`}>
          До меню
          <ArrowRight className="size-6" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
