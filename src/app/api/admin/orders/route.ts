import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const PATCH = withAuth(async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, status } = data;
    
    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
});
