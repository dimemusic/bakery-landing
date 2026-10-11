import Delivery from "./components/Delivery";
import Faq from "./components/Faq";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Menu from "./components/Menu";
import Reviews from "./components/Reviews";
import Why from "./components/Why";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <Marquee />
      <Menu />
      <Why />
      <Delivery />
      <Reviews />
      <Faq />
    </main>
  );
}
