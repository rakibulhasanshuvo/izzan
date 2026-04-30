"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CollectionDrawer } from "@/components/CollectionDrawer";
import { Product } from "@/generated/client";
import dynamic from "next/dynamic";

// Above the fold
import { Hero } from "@/components/sections/Hero";

// Dynamic Below the fold
const Pillars = dynamic(() => import("@/components/sections/Pillars").then((mod) => mod.Pillars));
const ShopSection = dynamic(() => import("@/components/sections/ShopSection").then((mod) => mod.ShopSection));
const Spotlight = dynamic(() => import("@/components/sections/Spotlight").then((mod) => mod.Spotlight));
const Story = dynamic(() => import("@/components/sections/Story").then((mod) => mod.Story));
const Features = dynamic(() => import("@/components/sections/Features").then((mod) => mod.Features));
const CareGuide = dynamic(() => import("@/components/sections/CareGuide").then((mod) => mod.CareGuide));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then((mod) => mod.Testimonials));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then((mod) => mod.FAQ));
const Community = dynamic(() => import("@/components/sections/Community").then((mod) => mod.Community));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection").then((mod) => mod.ContactSection));

interface HomeClientProps {
  products: Product[];
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
