import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

import { POST } from './route';
import { prisma } from '@/lib/db';

describe('Orders API POST handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createRequest = (body: Record<string, unknown>) => {
    return new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  const validPayload = {
    name: 'John Doe',
    phone: '01712345678',
    email: 'john@example.com',
    zila: 'Dhaka',
    upozila: 'Savar',
    shippingAddress: '123 Main St',
    items: [
      { id: 'prod1', name: 'Product 1', quantity: 2, price: 100 },
    ],
  };

  it('should return 400 if required fields are missing', async () => {
    const req = createRequest({ name: 'Incomplete' });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Missing required fields or empty cart');
  });

  it('should return 400 if items array is empty', async () => {
    const req = createRequest({ ...validPayload, items: [] });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Missing required fields or empty cart');
  });

  it('should successfully process a valid order for a new customer', async () => {
    const req = createRequest(validPayload);

    // Mock findUnique to return null for customer and email (new customer)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findUniqueMock = vi.spyOn(prisma.customer, "findUnique").mockResolvedValue(null as any);

    // Mock transaction
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transactionMock = vi.spyOn(prisma, "$transaction").mockImplementation(async (callback: any) => {
      // Mock the transaction client
      const txMock = {
        product: {
          findMany: vi.fn().mockResolvedValue([{ id: 'prod1', name: 'Product 1', price: 100, stock: 10 }]),
          findUnique: vi.fn().mockResolvedValue({ id: 'prod1', name: 'Product 1', price: 100, stock: 10 }),
          findFirst: vi.fn().mockResolvedValue({ id: 'prod1', name: 'Product 1', price: 100, stock: 10 }),
          update: vi.fn().mockResolvedValue({}),
        },
        customer: {
          create: vi.fn().mockResolvedValue({ id: 'cust1', name: 'John Doe', email: 'john@example.com' }),
          update: vi.fn(),
        },
        order: {
          create: vi.fn().mockResolvedValue({ id: 'order1' }),
        },
      };

      if (typeof callback === 'function') {
         return callback(txMock);
      }
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.orderId).toBe('order1');

    findUniqueMock.mockRestore();
    transactionMock.mockRestore();
  });

  it('should successfully process a valid order for an existing customer', async () => {
    const req = createRequest(validPayload);

    // Mock findUnique to return existing customer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findUniqueMock = vi.spyOn(prisma.customer, "findUnique").mockImplementation(((args: any) => {
      if (args?.where?.phone) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return Promise.resolve({ id: 'cust1', name: 'John Doe', phone: '01712345678', email: 'john@example.com', zila: 'Dhaka', upozila: 'Savar', location: 'Dhaka', totalSpend: 0, createdAt: new Date(), updatedAt: new Date() } as any);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Promise.resolve(null as any);
    }) /* eslint-disable-line @typescript-eslint/no-explicit-any */ as any);

    // Mock transaction
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transactionMock = vi.spyOn(prisma, "$transaction").mockImplementation(async (callback: any) => {
      // Mock the transaction client
      const txMock = {
        product: {
          findMany: vi.fn().mockResolvedValue([{ id: 'prod1', name: 'Product 1', price: 100, stock: 10 }]),
          findUnique: vi.fn().mockResolvedValue({ id: 'prod1', name: 'Product 1', price: 100, stock: 10 }),
          findFirst: vi.fn().mockResolvedValue({ id: 'prod1', name: 'Product 1', price: 100, stock: 10 }),
          update: vi.fn().mockResolvedValue({}),
        },
        customer: {
          create: vi.fn(),
          update: vi.fn().mockResolvedValue({ id: 'cust1', name: 'John Doe', email: 'john@example.com' }),
        },
        order: {
          create: vi.fn().mockResolvedValue({ id: 'order2' }),
        },
      };

      if (typeof callback === 'function') {
         return callback(txMock);
      }
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.orderId).toBe('order2');

    findUniqueMock.mockRestore();
    transactionMock.mockRestore();
  });

  it('should return 400 if a product is not found', async () => {
    const req = createRequest(validPayload);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findUniqueMock = vi.spyOn(prisma.customer, "findUnique").mockResolvedValue(null as any);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transactionMock = vi.spyOn(prisma, "$transaction").mockImplementation(async (callback: any) => {
      const txMock = {
        product: {
          // Mock product not found
          findMany: vi.fn().mockResolvedValue([]),
          findUnique: vi.fn().mockResolvedValue(null),
          findFirst: vi.fn().mockResolvedValue(null),
        },
      };

      if (typeof callback === 'function') {
         return callback(txMock);
      }
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Product not found: Product 1');

    findUniqueMock.mockRestore();
    transactionMock.mockRestore();
  });

  it('should return 400 if there is insufficient stock', async () => {
    const req = createRequest({
      ...validPayload,
      items: [
        { id: 'prod1', name: 'Product 1', quantity: 20, price: 100 },
      ],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findUniqueMock = vi.spyOn(prisma.customer, "findUnique").mockResolvedValue(null as any);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transactionMock = vi.spyOn(prisma, "$transaction").mockImplementation(async (callback: any) => {
      const txMock = {
        product: {
          // Mock stock 10 (less than 20 requested)
          findMany: vi.fn().mockResolvedValue([{ id: 'prod1', name: 'Product 1', price: 100, stock: 10 }]),
          findUnique: vi.fn().mockResolvedValue({ id: 'prod1', name: 'Product 1', price: 100, stock: 10 }),
          findFirst: vi.fn().mockResolvedValue({ id: 'prod1', name: 'Product 1', price: 100, stock: 10 }),
        },
      };

      if (typeof callback === 'function') {
         return callback(txMock);
      }
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Insufficient stock for Product 1. Only 10 left.');

    findUniqueMock.mockRestore();
    transactionMock.mockRestore();
  });
});
