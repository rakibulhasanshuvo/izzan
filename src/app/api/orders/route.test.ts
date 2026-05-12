/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';
import { prisma } from '@/lib/db';

// Mock the prisma client
vi.mock('@/lib/db', () => {
  return {
    prisma: {
      customer: {
        findUnique: vi.fn(),
      },
      $transaction: vi.fn(),
    },
  };
});

describe('POST /api/orders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const validBaseRequestData = {
    name: 'Test User',
    phone: '1234567890',
    email: 'test@example.com',
    zila: 'Dhaka',
    upozila: 'Gulshan',
    shippingAddress: '123 Test St',
  };

  const createRequest = (body: unknown) => {
    return new NextRequest('http://localhost:3000/api/orders', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  describe('Order items validation inside transaction', () => {
    it('should fail when item has invalid structure (missing id)', async () => {
      const requestData = {
        ...validBaseRequestData,
        items: [{ quantity: 1, name: 'Test Product' }], // missing id
      };

      const req = createRequest(requestData);

      vi.mocked(prisma.$transaction).mockImplementation(async (callback: any) => {
        const txMock = {
          product: {
            findUnique: vi.fn(),
            update: vi.fn(),
          },
          customer: {
            create: vi.fn(),
            update: vi.fn(),
          },
          order: {
            create: vi.fn(),
          }
        };
        return callback(txMock);
      });

      const response = await POST(req);
      const json = await response.json();

      expect(response.status).toBe(400);
      expect(json.error).toBe('Invalid item structure for Test Product');
    });

    it('should fail when item has invalid structure (missing quantity)', async () => {
      const requestData = {
        ...validBaseRequestData,
        items: [{ id: 'prod_1', name: 'Test Product' }], // missing quantity
      };

      const req = createRequest(requestData);

      vi.mocked(prisma.$transaction).mockImplementation(async (callback: any) => {
        const txMock = {
          product: {
            findUnique: vi.fn(),
            update: vi.fn(),
          },
        };
        return callback(txMock);
      });

      const response = await POST(req);
      const json = await response.json();

      expect(response.status).toBe(400);
      expect(json.error).toBe('Invalid item structure for Test Product');
    });

    it('should fail when item has invalid structure (zero quantity)', async () => {
      const requestData = {
        ...validBaseRequestData,
        items: [{ id: 'prod_1', quantity: 0, name: 'Test Product' }], // missing quantity
      };

      const req = createRequest(requestData);

      vi.mocked(prisma.$transaction).mockImplementation(async (callback: any) => {
        const txMock = {
          product: {
            findUnique: vi.fn(),
            update: vi.fn(),
          },
        };
        return callback(txMock);
      });

      const response = await POST(req);
      const json = await response.json();

      expect(response.status).toBe(400);
      expect(json.error).toBe('Invalid item structure for Test Product');
    });

    it('should fail when item has invalid structure (negative quantity)', async () => {
      const requestData = {
        ...validBaseRequestData,
        items: [{ id: 'prod_1', quantity: -5, name: 'Test Product' }], // missing quantity
      };

      const req = createRequest(requestData);

      vi.mocked(prisma.$transaction).mockImplementation(async (callback: any) => {
        const txMock = {
          product: {
            findUnique: vi.fn(),
            update: vi.fn(),
          },
        };
        return callback(txMock);
      });

      const response = await POST(req);
      const json = await response.json();

      expect(response.status).toBe(400);
      expect(json.error).toBe('Invalid item structure for Test Product');
    });

    it('should fail when product is not found', async () => {
       const requestData = {
        ...validBaseRequestData,
        items: [{ id: 'prod_1', quantity: 1, name: 'Test Product' }],
      };

      const req = createRequest(requestData);

      vi.mocked(prisma.$transaction).mockImplementation(async (callback: any) => {
        const txMock = {
          product: {
            findUnique: vi.fn().mockResolvedValue(null),
          },
        };
        return callback(txMock);
      });

      const response = await POST(req);
      const json = await response.json();

      expect(response.status).toBe(400);
      expect(json.error).toBe('Product not found: Test Product');
    });

    it('should fail when stock is insufficient', async () => {
      const requestData = {
        ...validBaseRequestData,
        items: [{ id: 'prod_1', quantity: 5, name: 'Test Product' }],
      };

      const req = createRequest(requestData);

      vi.mocked(prisma.$transaction).mockImplementation(async (callback: any) => {
        const txMock = {
          product: {
            findUnique: vi.fn().mockResolvedValue({
              id: 'prod_1',
              name: 'Test Product',
              stock: 2, // Less than requested 5
              price: 100,
            }),
          },
        };
        return callback(txMock);
      });

      const response = await POST(req);
      const json = await response.json();

      expect(response.status).toBe(400);
      expect(json.error).toBe('Insufficient stock for Test Product. Only 2 left.');
    });
  });
});
