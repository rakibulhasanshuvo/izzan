import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const POST = withAuth(async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.name || !data.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        location: data.location || null,
        tier: data.tier || "Bronze",
        totalSpend: data.totalSpend ? parseFloat(data.totalSpend) : 0,
      },
    });
    return NextResponse.json(customer);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
});

export const PATCH = withAuth(async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updateData } = data;
    
    if (!id) {
      return NextResponse.json({ error: "Missing customer ID" }, { status: 400 });
    }

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        name: updateData.name,
        email: updateData.email,
        phone: updateData.phone,
        location: updateData.location,
        tier: updateData.tier,
        totalSpend: updateData.totalSpend ? parseFloat(updateData.totalSpend) : undefined,
      },
    });
    
    return NextResponse.json(customer);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
});
