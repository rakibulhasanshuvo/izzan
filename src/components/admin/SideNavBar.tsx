"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Overview", href: "/admin", icon: "dashboard" },
  { name: "Products", href: "/admin/products", icon: "inventory_2" },
  { name: "Orders", href: "/admin/orders", icon: "shopping_cart" },
  { name: "Content CMS", href: "/admin/cms", icon: "article" },
  { name: "Customers", href: "/admin/customers", icon: "group" },
  { name: "Settings", href: "/admin/settings", icon: "settings", mt: "auto" },
];

export default function SideNavBar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Sidebar Navigation" className="fixed left-0 top-0 h-full flex flex-col py-8 w-[260px] border-r border-zinc-800/10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] bg-white/80 backdrop-blur-2xl z-50">
      <div className="px-8 mb-xl">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-serif italic font-bold shadow-lg shadow-primary/20">
            A
          </div>
          <h1 className="font-serif italic text-2xl text-zinc-900 tracking-tight">Izzan Admin</h1>
        </div>
        <p className="font-body-sm text-[12px] text-zinc-500 uppercase tracking-widest pl-[52px]">Luxe Studio</p>
      </div>
      
      <ul className="flex flex-col flex-1 w-full mt-6 px-6 space-y-2">
        {NAV_ITEMS.map((item) => {
          // Exact match for overview, or starts with for others
          const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          return (
            <li key={item.name} className={item.mt === "auto" ? "mt-auto pt-6 border-t border-zinc-100" : ""}>
              <Link
                aria-current={isActive ? "page" : undefined}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-2xl font-serif font-medium tracking-wide transition-all duration-300 group",
                  isActive
                    ? "bg-zinc-50 text-zinc-900 shadow-sm border border-zinc-200/50"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 border border-transparent"
                )}
              >
                <span aria-hidden="true" className={cn(
                  "material-symbols-outlined mr-4 transition-transform duration-300", 
                  !isActive && "group-hover:scale-110",
                  isActive && "text-primary"
                )}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
