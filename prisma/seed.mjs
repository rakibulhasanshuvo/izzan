import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD8oz6-Sg586xPq5mJx1g1FLgZ5HcTKJliYsmN46wDI_VUNFS6cC-ocsffImJho4F8OKRpexTgbDv8mLcCDnnNh9BlUZawueRnl9SYPcKMT-bml6_BE5sIoOYyfc7wmmBkxCjDh7gE0id9zfDRErApzvuBNuP4AntNOOgbuvCQGmeEIkK3ZmT7ujCYFxXCupsPBj1V_BCkDMOxI2_rl41q-amM7V7DgXe5p1b5m2iKpn_VUxE94gQyHUb8PBTsd9mzHRZixaQgnlyGn",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCVmDWzO3fIsa6g8efDclw6fOt6K0ZJuceIbbrDTaD2Lyup9gS9lNFkMxB73LazQVYHFhBmALDWnYbd2v6w8WuErf5e4Vz82GS_Od72Mf1OlAuTukU5Oeyby1hGQXAfQIpYZEUBI2hBHRZc5UpwYghogk-pJsppAQBNHIE3XH0kxgQIlcj_x9NVei5WeFiaD1w-KxTTY7ik-KnMJ7DgH9tJg4l8Hgk1q1QLCjurasFTKxaAIXCfeA3lHICD8n2ZVZJux9A1t-KQ2TOZ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCkoWNHxQhWVZD8vdrMHx3oi_Z7pcWg3xW1DjVLZyubJsonYHVVKHYyJzU-RHVa0B9aCKHoSo1-eMkClG6acIp-yXTGHxeOs94QcleyxbKKi5d3HW_2eE_lexI_vcjS4_vNNAlvEkKc5Dj28M8gdqzgh6JUrM4aZkaSbfBMsyJyBuOAPyoCYZoz_OQVwSyqpUllsRsMlZocSOljjJB6pXmgXmrQNSVnf1HHJlFWMQhmTxMccOON6C7w2GaKKPzAU5flzR66nA2_Axbc",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC5TyuEM-QecODGheVYbKwjShH-s76sTGmXLfRXo4T-OwBbil1ATF4Ep3ypplDu_KayzP_cSOJRgv0Lnc_nItl70AIwF8WFjcSvAr5MxR4DNDVvrQNdGdy5ykdHiUq1wlCUxJnpX8wWyg5uqcle6LWFWttbF4G3eoGsGEULp-hFErOvB6slCPwADC5eW9ZQ16-GSsqAaGCXpodPBrsvlVdQK8UI8UMHrPCKG4CsCDiWuyykehepLt-YUOnDX4XYYEi8DLoMEmKOraiH",
];

const productsData = [
  { name: "Lavender Drift Candle", price: 28, img: IMAGES[0], hoverImg: IMAGES[1], categories: "Best Sellers", badge: "Best Seller" },
  { name: "Eucalyptus Essential Oil", price: 35, img: IMAGES[1], hoverImg: IMAGES[2], categories: "Best Sellers, New Arrivals", badge: "New" },
  { name: "Amber Bloom Candle", price: 28, img: IMAGES[2], hoverImg: IMAGES[3], categories: "Best Sellers", badge: "" },
  { name: "Sandalwood Mist Diffuser", price: 38, originalPrice: 45, img: IMAGES[3], hoverImg: IMAGES[0], categories: "Sale", badge: "Sale" },
  { name: "Vanilla Bean & Oak", price: 30, img: IMAGES[0], hoverImg: IMAGES[1], categories: "New Arrivals", badge: "New" },
  { name: "Citrus Grove Oil", price: 25, originalPrice: 32, img: IMAGES[1], hoverImg: IMAGES[2], categories: "Sale", badge: "Sale" },
  { name: "Midnight Jasmine", price: 28, img: IMAGES[2], hoverImg: IMAGES[3], categories: "Best Sellers", badge: "" },
  { name: "Rosemary Mint Candle", price: 26, img: IMAGES[3], hoverImg: IMAGES[0], categories: "New Arrivals", badge: "" },
  { name: "Bergamot & Clove", price: 32, img: IMAGES[0], hoverImg: IMAGES[1], categories: "Best Sellers, New Arrivals", badge: "" },
  { name: "Peppermint Oil", price: 22, originalPrice: 28, img: IMAGES[1], hoverImg: IMAGES[2], categories: "Sale", badge: "Sale" },
  { name: "Wild Fig & Cedar", price: 30, img: IMAGES[2], hoverImg: IMAGES[3], categories: "Best Sellers", badge: "" },
  { name: "White Tea Diffuser", price: 40, img: IMAGES[3], hoverImg: IMAGES[0], categories: "New Arrivals", badge: "New" },
  { name: "Ocean Breeze Candle", price: 26, img: IMAGES[0], hoverImg: IMAGES[1], categories: "Sale", originalPrice: 34, badge: "Sale" },
  { name: "Lemongrass Oil", price: 24, img: IMAGES[1], hoverImg: IMAGES[2], categories: "Best Sellers", badge: "" },
  { name: "Patchouli Noir", price: 29, img: IMAGES[2], hoverImg: IMAGES[3], categories: "New Arrivals", badge: "New" },
  { name: "Sage & Sweetgrass", price: 27, img: IMAGES[3], hoverImg: IMAGES[0], categories: "Best Sellers", badge: "" },
  { name: "Warm Cinnamon", price: 25, img: IMAGES[0], hoverImg: IMAGES[1], categories: "Sale", originalPrice: 30, badge: "Sale" },
  { name: "Tea Tree Oil", price: 21, img: IMAGES[1], hoverImg: IMAGES[2], categories: "New Arrivals", badge: "" },
  { name: "Golden Amber", price: 31, img: IMAGES[2], hoverImg: IMAGES[3], categories: "Best Sellers", badge: "" },
  { name: "Forest Pine Candle", price: 28, img: IMAGES[3], hoverImg: IMAGES[0], categories: "Best Sellers, Sale", originalPrice: 35, badge: "Sale" },
  { name: "Himalayan Salt Diffuser", price: 45, img: IMAGES[0], hoverImg: IMAGES[1], categories: "New Arrivals", badge: "New" },
  { name: "Frankincense Oil", price: 38, img: IMAGES[1], hoverImg: IMAGES[2], categories: "Best Sellers", badge: "" },
  { name: "Neroli Blossom", price: 34, img: IMAGES[2], hoverImg: IMAGES[3], categories: "Sale", originalPrice: 42, badge: "Sale" },
  { name: "Aura Signature Collection", price: 85, img: IMAGES[3], hoverImg: IMAGES[0], categories: "Best Sellers, New Arrivals", badge: "Best Seller" },
];

async function main() {
  console.log('Start seeding...');
  
  try {
    // Clear existing data
    await prisma.product.deleteMany();
    
    for (const p of productsData) {
      const product = await prisma.product.create({
        data: p,
      });
      console.log(`Created product with id: ${product.id}`);
    }

    const cmsData = [
      { key: "hero_title", value: "Discover Your Moment of Calm", section: "hero" },
      { key: "hero_subtitle", value: "Handcrafted, Natural Candles & Essential Oils. Elevate Your Space.", section: "hero" },
      { key: "story_title", value: "Our Story", section: "story" },
      { key: "story_content", value: "At Aura, we believe that your home should be a sanctuary. Our journey began with a simple goal: to create scents that inspire peace and mindfulness.", section: "story" },
    ];

    for (const content of cmsData) {
      await prisma.cMSContent.upsert({
        where: { key: content.key },
        update: {},
        create: content,
      });
    }
    
    console.log('Seeding finished.');
  } catch (err) {
    console.error('Error during seeding:', err);
    throw err;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
