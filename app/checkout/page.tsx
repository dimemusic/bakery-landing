import type { Metadata } from "next";
import CheckoutView from "../components/CheckoutView";

export const metadata: Metadata = {
  title: "Оформлення замовлення",
  description:
    "Вкажіть контакти та спосіб отримання: доставка або самовивіз із кафе.",
};

export default function CheckoutPage() {
  return (
    <main id="main-content" className="flex-1">
      <CheckoutView />
    </main>
  );
}
