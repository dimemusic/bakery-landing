import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { btnPrimary } from "../lib/ui";
import BoxArt from "./BoxArt";

/** Friendly empty state with the cartoon box (purely decorative). */
export default function EmptyCart({
  title = "У кошику поки порожньо",
  text = "Додайте щось смачне з меню — і воно з’явиться тут.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="mx-auto max-w-xl py-8 text-center">
      <div className="mx-auto max-w-[20rem]">
        <BoxArt pieces={[]} />
      </div>
      <h2 className="mt-10 font-heading text-3xl leading-10 text-brick">
        {title}
      </h2>
      <p className="mt-3 text-lg leading-8 text-brown">{text}</p>
      <Link href="/#menu" className={`mt-8 ${btnPrimary}`}>
        Обрати солодощі
        <ArrowRight className="size-6" aria-hidden="true" />
      </Link>
    </section>
  );
}
