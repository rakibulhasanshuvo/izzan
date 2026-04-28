import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const { id, value } = await req.json();
    
    const content = await prisma.cMSContent.update({
      where: { id },
      data: { value },
    });
    
    return NextResponse.json(content);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update CMS content" }, { status: 500 });
  }
}
