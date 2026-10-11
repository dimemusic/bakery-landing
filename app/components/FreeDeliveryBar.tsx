import { Truck } from "lucide-react";
import { remainingForFree } from "../lib/delivery";
import { formatPrice } from "../lib/format";
import { FREE_DELIVERY_FROM } from "../lib/site";

/** "Ще 150 грн до безкоштовної доставки" + progress bar. */
export default function FreeDeliveryBar({ subtotal }: { subtotal: number }) {
  const remaining = remainingForFree(subtotal);
  const free = remaining === 0;
  const now = Math.min(subtotal, FREE_DELIVERY_FROM);

  return (
    <div>
      <p className="flex items-center gap-2 text-base leading-6 font-bold text-brick-deep">
        <Truck className="size-6 shrink-0" aria-hidden="true" />
        {free
          ? "Доставка безкоштовна!"
          : `Ще ${formatPrice(remaining)} до безкоштовної доставки`}
      </p>
      <div
        role="progressbar"
        aria-label="Прогрес до безкоштовної доставки"
        aria-valuemin={0}
        aria-valuemax={FREE_DELIVERY_FROM}
        aria-valuenow={now}
        aria-valuetext={`${formatPrice(now)} з ${formatPrice(FREE_DELIVERY_FROM)}`}
        className="mt-2 h-4 overflow-hidden rounded-full border-2 border-dashed border-brick-soft bg-cream"
      >
        <div
          className={`h-full origin-left rounded-full transition-transform duration-500 ease-out ${
            free ? "bg-teal" : "bg-coral"
          }`}
          style={{
            transform: `scaleX(${Math.min(1, subtotal / FREE_DELIVERY_FROM)})`,
          }}
        />
      </div>
    </div>
  );
}
