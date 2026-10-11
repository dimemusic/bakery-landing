import type { Metadata } from "next";
import { Marmelad, Nunito } from "next/font/google";
import CartToast from "./components/CartToast";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./lib/cart";
import { BRAND, TAGLINE } from "./lib/site";
import "./globals.css";

// Rounded, hand-drawn-ish display face; Ї Є Ґ І verified. Single weight (400).
const marmelad = Marmelad({
  weight: "400",
  variable: "--font-marmelad",
  subsets: ["cyrillic", "latin"],
});

// Fallback body font until Evolventa (OFL) is available.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  // absolute base for Open Graph images; set NEXT_PUBLIC_SITE_URL in production
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: `${BRAND} — домашні торти, печиво, десерти та булочки з доставкою`,
    template: `%s — ${BRAND}`,
  },
  description: `${TAGLINE}. Торти, печиво, десерти, булочки, тістечка й мафіни за родинними рецептами. Замовляйте онлайн — з доставкою або самовивозом.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      data-scroll-behavior="smooth"
      className={`${marmelad.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-xl bg-brick px-4 py-3 font-bold text-cream focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Перейти до змісту
        </a>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
