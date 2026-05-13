import React from "react";
import SideNavBar from "@/components/admin/SideNavBar";
import TopAppBar from "@/components/admin/TopAppBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      <SideNavBar />
      <div className="flex flex-col flex-1">
        <TopAppBar />
        <main className="ml-[260px] p-6 md:p-10 xl:p-12 max-w-[1440px] mx-auto w-[calc(100%-260px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
