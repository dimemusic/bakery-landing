import type { Metadata } from "next";
import CartView from "../components/CartView";

export const metadata: Metadata = {
  title: "Кошик",
  description: "Ваш кошик: перевірте товари, кількість і вартість доставки.",
};

export default function CartPage() {
  return (
    <main id="main-content" className="flex-1">
      <CartView />
    </main>
  );
}
