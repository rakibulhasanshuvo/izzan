import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";

export const PATCH = withAuth(async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();

    if (!authData?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = authData.user.email;

    let settings = await prisma.adminSettings.findUnique({
      where: { email: userEmail }
    });
    
    if (settings) {
      settings = await prisma.adminSettings.update({
        where: { id: settings.id },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
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
          email: userEmail,
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
});
