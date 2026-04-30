import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { apiHandler } from "@/lib/api";

export const GET = withAuth(apiHandler(async function GET(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _url = req.url;
  const products = await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(products);
}, "Failed to fetch products"));

export const POST = withAuth(apiHandler(async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.name || !data.price || data.stock === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : null,
      img: data.img,
      hoverImg: data.hoverImg,
      categories: data.categories,
      badge: data.badge,
      stock: parseInt(data.stock),
    },
  });
  return NextResponse.json(product);
}, "Failed to create product"));

export const PATCH = withAuth(apiHandler(async function PATCH(req: NextRequest) {
  const data = await req.json();
  const { id, ...updateData } = data;

  if (!id) {
    return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
  }
  const product = await prisma.product.update({
    where: { id },
    data: {
      name: updateData.name,
      description: updateData.description,
      price: parseFloat(updateData.price),
      originalPrice: updateData.originalPrice ? parseFloat(updateData.originalPrice) : null,
      img: updateData.img,
      hoverImg: updateData.hoverImg,
      categories: updateData.categories,
      badge: updateData.badge,
      stock: parseInt(updateData.stock),
    },
  });
  return NextResponse.json(product);
}, "Failed to update product"));

export const DELETE = withAuth(apiHandler(async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing product ID" }, { status: 400 });

  await prisma.product.delete({
    where: { id },
  });
  return NextResponse.json({ success: true });
}, "Failed to delete product"));
