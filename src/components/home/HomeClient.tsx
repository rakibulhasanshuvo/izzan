"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CollectionDrawer } from "@/components/CollectionDrawer";
import { Product } from "@/generated/client";

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

  const bestSellers = useMemo(() => products.filter(p => p.categories.includes("Best Sellers")), [products]);
  const newArrivals = useMemo(() => products.filter(p => p.categories.includes("New Arrivals")), [products]);
  const saleItems = useMemo(() => products.filter(p => p.categories.includes("Sale")), [products]);

  const handleExplore = useCallback((title: string, products: Product[]) => {
    setDrawerContent({ title, products });
  }, []);

  return (
    <>
      <Header onViewAllProducts={useCallback(() => handleExplore("Full Collection", products), [handleExplore, products])} />
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
