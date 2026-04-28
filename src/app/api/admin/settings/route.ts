import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    
    // In a real app, this would be tied to the logged-in user.
    // Here we'll just update the first settings record, or create it if it doesn't exist.
    let settings = await prisma.adminSettings.findFirst();
    
    if (settings) {
      settings = await prisma.adminSettings.update({
        where: { id: settings.id },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          bio: data.bio,
          emailAlerts: data.emailAlerts,
          orderNotifs: data.orderNotifs,
          marketingUpdates: data.marketingUpdates,
        },
      });
    } else {
      settings = await prisma.adminSettings.create({
        data: {
          firstName: data.firstName || "Admin",
          lastName: data.lastName || "User",
          email: data.email || "admin@example.com",
          bio: data.bio || "",
          emailAlerts: data.emailAlerts ?? true,
          orderNotifs: data.orderNotifs ?? true,
          marketingUpdates: data.marketingUpdates ?? false,
        },
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
