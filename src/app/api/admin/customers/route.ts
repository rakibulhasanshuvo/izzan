import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { apiHandler } from "@/lib/api";

export const POST = withAuth(apiHandler(async function POST(req: NextRequest) {
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
}, "Failed to create customer"));

export const PATCH = withAuth(apiHandler(async function PATCH(req: NextRequest) {
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
}, "Failed to update customer"));
