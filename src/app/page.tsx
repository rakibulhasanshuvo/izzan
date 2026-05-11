import HomeClient from "@/components/home/HomeClient";
import { products } from "@/lib/mockData";

export default function Home() {
  const cmsMap: Record<string, string> = {
    hero_title: "Discover Your Moment of Calm.",
    hero_subtitle: "Handcrafted, Natural Candles & Essential Oils. Elevate Your Space.",
  };

  return <HomeClient products={products} cms={cmsMap} />;
}
