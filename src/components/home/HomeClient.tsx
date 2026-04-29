"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CollectionDrawer } from "@/components/CollectionDrawer";
import { Product as GeneratedProduct } from "@/generated/client";

// Define local Product type to match what the child components expect
type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  img: string;
  hoverImg: string | null;
  categories: string;
  badge: string | null;
};


// Sections
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { ShopSection } from "@/components/sections/ShopSection";
import { Spotlight } from "@/components/sections/Spotlight";
import { Story } from "@/components/sections/Story";
import { Features } from "@/components/sections/Features";
import { CareGuide } from "@/components/sections/CareGuide";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Community } from "@/components/sections/Community";
import { ContactSection } from "@/components/sections/ContactSection";

interface HomeClientProps {
  products: GeneratedProduct[];
  cms: Record<string, string>;
}

export default function HomeClient({ products, cms }: HomeClientProps) {
  const [drawerContent, setDrawerContent] = useState<{ title: string; products: Product[] } | null>(null);

  // Transform to local Product type to remove description, stock, createdAt, updatedAt
  const localProducts: Product[] = products.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    img: p.img,
    hoverImg: p.hoverImg,
    categories: p.categories,
    badge: p.badge,
  }));

  const bestSellers = localProducts.filter(p => p.categories.includes("Best Sellers"));
  const newArrivals = localProducts.filter(p => p.categories.includes("New Arrivals"));
  const saleItems = localProducts.filter(p => p.categories.includes("Sale"));

  const handleExplore = (title: string, products: Product[]) => {
    setDrawerContent({ title, products });
  };

  return (
    <>
      <Header onViewAllProducts={() => handleExplore("Full Collection", localProducts)} />
      <main className="flex-1">
        <Hero title={cms.hero_title} subtitle={cms.hero_subtitle} />
        <Pillars />
        <ShopSection
          bestSellers={bestSellers}
          newArrivals={newArrivals}
          saleItems={saleItems}
          onExplore={handleExplore}
        />
        <Spotlight />
        <Story title={cms.story_title} content={cms.story_content} />
        <Features />
        <CareGuide />
        <Testimonials />
        <FAQ />
        <Community />
        <ContactSection />
      </main>
      <Footer />
      <CollectionDrawer
        isOpen={!!drawerContent}
        onClose={() => setDrawerContent(null)}
        title={drawerContent?.title || ""}
        products={drawerContent?.products || []}
      />
    </>
  );
}
