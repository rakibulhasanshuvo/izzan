import { test, vi, expect } from "vitest";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

/**
 * 🧪 Products API PATCH handler tests
 */

test("PATCH /api/admin/products - Missing ID", async () => {
    const { PATCH } = await import("./route");

    const req = new NextRequest("http://localhost/api/admin/products", {
        method: "PATCH",
        headers: {
            "Authorization": "Bearer test-token"
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findUniqueMock = vi.spyOn(prisma.product, "findUnique").mockResolvedValue(null as any);

    const req = new NextRequest("http://localhost/api/admin/products", {
        method: "PATCH",
        headers: {
            "Authorization": "Bearer test-token"
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
            "Authorization": "Bearer test-token"
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
            "Authorization": "Bearer test-token"
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
            "Authorization": "Bearer test-token"
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findUniqueMock = vi.spyOn(prisma.product, "findUnique").mockResolvedValue(mockProduct as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateMock = vi.spyOn(prisma.product, "update").mockImplementation((({ data }: any) => Promise.resolve({ ...mockProduct, ...data })) as any);

    const req = new NextRequest("http://localhost/api/admin/products", {
        method: "PATCH",
        headers: {
            "Authorization": "Bearer test-token"
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
