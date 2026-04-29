import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const PATCH = withAuth(async function PATCH(req: NextRequest) {
  try {
    const { id, value } = await req.json();
    
    if (!id || value === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const content = await prisma.cMSContent.update({
      where: { id },
      data: { value },
    });
    
    return NextResponse.json(content);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update CMS content" }, { status: 500 });
  }
});
