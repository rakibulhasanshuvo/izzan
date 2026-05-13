vi.mock("@/lib/auth", () => ({
  checkAdminAuth: vi.fn().mockResolvedValue(true),
  withAuth: vi.fn().mockImplementation((handler) => handler),
}));

import { test, expect, vi } from "vitest";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest } from "next/server.js";
import { prisma } from "@/lib/db";

/**
 * 🧪 Products API PATCH handler tests
 *
 * To run these tests:
 * node --experimental-strip-types --test src/app/api/admin/products/route.test.ts
 */

process.env.ADMIN_TOKEN = "test-token";

test("PATCH /api/admin/products - Missing ID", async () => {
    const { PATCH } = await import("./route");

    const req = new NextRequest("http://localhost/api/admin/products", {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${process.env.ADMIN_TOKEN}`
        },
        body: JSON.stringify({})
    });

    const res = await PATCH(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Missing product ID");
});

test("PATCH /api/admin/products - Product Not Found", async () => {
    const { PATCH } = await import("./route");

    // Mock prisma.product.findUnique
    const findUniqueMock = (vi.spyOn(prisma.product, "findUnique" as any) as any).mockImplementation(async () => null);

    const req = new NextRequest("http://localhost/api/admin/products", {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${process.env.ADMIN_TOKEN}`
        },
        body: JSON.stringify({ id: "non-existent" })
    });

    const res = await PATCH(req);
    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.error).toBe("Product not found");

    findUniqueMock.mockRestore();
});

test("PATCH /api/admin/products - Invalid Name", async () => {
    const { PATCH } = await import("./route");

    const req = new NextRequest("http://localhost/api/admin/products", {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${process.env.ADMIN_TOKEN}`
        },
        body: JSON.stringify({ id: "123", name: "" })
    });

    const res = await PATCH(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Name must be a non-empty string");
});

test("PATCH /api/admin/products - Invalid Price", async () => {
    const { PATCH } = await import("./route");

    const req = new NextRequest("http://localhost/api/admin/products", {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${process.env.ADMIN_TOKEN}`
        },
        body: JSON.stringify({ id: "123", price: "invalid" })
    });

    const res = await PATCH(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid price");
});

test("PATCH /api/admin/products - Invalid Stock", async () => {
    const { PATCH } = await import("./route");

    const req = new NextRequest("http://localhost/api/admin/products", {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${process.env.ADMIN_TOKEN}`
        },
        body: JSON.stringify({ id: "123", stock: "abc" })
    });

    const res = await PATCH(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid stock");
});

test("PATCH /api/admin/products - Successful Update", async () => {
    const { PATCH } = await import("./route");

    const mockProduct = { id: "123", name: "Old Name", price: 10, stock: 5 };
    const findUniqueMock = (vi.spyOn(prisma.product, "findUnique" as any) as any).mockImplementation(async () => mockProduct);

    const updateMock = (vi.spyOn(prisma.product, "update" as any) as any).mockImplementation(async ({ data }: any) => ({ ...mockProduct, ...data }));

    const req = new NextRequest("http://localhost/api/admin/products", {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${process.env.ADMIN_TOKEN}`
        },
        body: JSON.stringify({ id: "123", name: "New Name", price: 15, stock: 10 })
    });

    const res = await PATCH(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.name).toBe("New Name");
    expect(data.price).toBe(15);
    expect(data.stock).toBe(10);

    findUniqueMock.mockRestore();
    updateMock.mockRestore();
});
