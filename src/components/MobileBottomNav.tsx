"use client";

import Link from "next/link";
import { Home, ShoppingBag, ShoppingCart, BookOpen, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useMounted } from "@/hooks/useMounted";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/#shop", icon: ShoppingBag },
  { label: "Cart", href: "#cart", icon: ShoppingCart, isCart: true },
  { label: "Story", href: "/#story", icon: BookOpen },
  { label: "Support", href: "/#contact", icon: Phone },
];

export function MobileBottomNav() {
  const { cartCount, toggleCart } = useCart();
  const mounted = useMounted();
  const pathname = usePathname();

  // Don't show on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="
        fixed bottom-0 left-0 right-0 z-50
        md:hidden
        bg-background-dark/95 backdrop-blur-xl
        border-t border-white/[0.06]
        safe-area-pb
      "
    >
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href.replace("/#", "/")));

          if (item.isCart) {
            return (
              <button
                key={item.label}
                onClick={toggleCart}
                aria-label="Open Cart"
                className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 group relative"
              >
                <div className="relative">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-gray-400 group-active:text-primary transition-colors"
                  />
                  {mounted && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400 group-active:text-primary transition-colors mt-0.5">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 group relative"
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                className={`transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-gray-400 group-active:text-primary"
                }`}
              />
              <span
                className={`text-[9px] font-bold uppercase tracking-[0.12em] transition-colors mt-0.5 ${
                  isActive
                    ? "text-primary"
                    : "text-gray-400 group-active:text-primary"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
