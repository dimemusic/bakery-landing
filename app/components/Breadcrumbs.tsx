import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { focusRing } from "../lib/ui";

export type Crumb = { label: string; href?: string };

/** Меню / Торти / Медовик — the last crumb is the current page. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Навігаційний ланцюжок">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-base leading-6 font-bold text-brick-deep">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-1">
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className={`inline-flex min-h-10 items-center rounded-lg px-1 underline decoration-dashed underline-offset-4 hover:text-coral-deep ${focusRing}`}
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="inline-flex min-h-10 items-center px-1 text-brown"
                >
                  {c.label}
                </span>
              )}
              {!last && (
                <ChevronRight
                  className="size-4 shrink-0 text-brick-soft"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
