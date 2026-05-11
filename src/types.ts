export type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  originalPrice?: number | null;
  img: string;
  hoverImg?: string | null;
  categories: string;
  badge?: string | null;
  stock: number;
};
