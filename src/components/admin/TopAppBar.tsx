"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function TopAppBar() {
  const pathname = usePathname();
  
  // Smarter breadcrumb logic
  let formattedName = "Dashboard";
  if (pathname === "/admin") {
    formattedName = "Overview";
  } else {
    const pageName = pathname.split("/").pop() || "Dashboard";
    formattedName = pageName === "cms" ? "CMS" : pageName.charAt(0).toUpperCase() + pageName.slice(1);
  }

  return (
    <header aria-label="Top Application Bar" className="sticky top-0 z-40 flex items-center justify-between px-10 ml-[260px] w-[calc(100%-260px)] h-20 bg-white/80 backdrop-blur-3xl border-b border-zinc-200/50 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="text-zinc-400 font-medium tracking-widest uppercase text-[11px]">Admin</div>
        <span aria-hidden="true" className="material-symbols-outlined text-[16px] text-zinc-400">chevron_right</span>
        <div className="font-serif text-zinc-800 text-lg capitalize tracking-wide">{formattedName}</div>
      </div>
      
      <div className="flex items-center gap-6">
        <button aria-label="Notifications" className="relative text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full hover:text-zinc-900 transition-colors duration-300 flex items-center group">
          <span aria-hidden="true" className="material-symbols-outlined group-hover:scale-110 transition-transform">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border border-white"></span>
        </button>
        <button aria-label="Search" className="text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full hover:text-zinc-900 transition-colors duration-300 flex items-center group">
          <span aria-hidden="true" className="material-symbols-outlined group-hover:scale-110 transition-transform">search</span>
        </button>
        <button aria-label="User Profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ml-2 cursor-pointer hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Z6EOvrTdFYj2jxBp2kgCLuxY-wuRAOwt4AUKYz3EwVFFwDrRwW5F6R7jKNh38rfSi146wxLCmlH3Neb5PI0o7QJr2zzHDTp87l-LmnZNyH7pbTUJ7EjfhnizZD32u2FoBOuO-Q5TqdK1XRMlQQgBYTMHlaws9KxSUv2ELxyyTZI41WYpEcfEGTIEv8Q_Q6pDylg10n1ub1nbjt5FuTBsuYUF29WQNI83X01ECb_U3TY3UIeg5uJZ1hRRapg_mJrdc0RXHZxotQw"
          />
        </button>
      </div>
    </header>
  );
}
