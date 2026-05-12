import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/db', async () => {
  const { mockDeep } = await import('vitest-mock-extended');
  return {
    prisma: mockDeep(),
  };
});

import { PATCH } from './route';
import { prisma } from '@/lib/db';
import { PrismaClient, Product } from '@/generated/client';

const prismaMock = prisma as unknown as ReturnType<typeof import('vitest-mock-extended').mockDeep<PrismaClient>>;

describe('Products API PATCH handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createRequest = (body: Record<string, unknown>) => {
    return new NextRequest('http://localhost:3000/api/admin/products', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  it('should return 400 if product ID is missing', async () => {
    const req = createRequest({ name: 'Valid Name' });
    const response = await PATCH(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Missing product ID');
  });

  it('should return 400 if name is invalid (empty string)', async () => {
    const req = createRequest({ id: 'prod1', name: '   ' });
    const response = await PATCH(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Name must be a non-empty string');
  });

  it('should return 400 if name is invalid (not a string)', async () => {
    const req = createRequest({ id: 'prod1', name: 123 });
    const response = await PATCH(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Name must be a non-empty string');
  });

  it('should return 400 if price is invalid', async () => {
    const req = createRequest({ id: 'prod1', price: 'abc' });
    const response = await PATCH(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid price');
  });

  it('should return 400 if originalPrice is invalid', async () => {
    const req = createRequest({ id: 'prod1', originalPrice: 'abc' });
    const response = await PATCH(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid original price');
  });

  it('should set originalPrice to null if originalPrice is falsy', async () => {
    const req = createRequest({ id: 'prod1', originalPrice: '' });

    prismaMock.product.findUnique.mockResolvedValue({ id: 'prod1' } as Product);
    prismaMock.product.update.mockResolvedValue({ id: 'prod1', originalPrice: null } as unknown as Product);

    const response = await PATCH(req);
    // Remove unused `data` assignment to fix warning

    expect(response.status).toBe(200);
    expect(prismaMock.product.update).toHaveBeenCalledWith({
      where: { id: 'prod1' },
      data: expect.objectContaining({ originalPrice: null }),
    });
  });

  it('should return 400 if stock is invalid', async () => {
    const req = createRequest({ id: 'prod1', stock: 'abc' });
    const response = await PATCH(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid stock');
  });

  it('should return 404 if product is not found', async () => {
    const req = createRequest({ id: 'prod1', name: 'New Name' });

    prismaMock.product.findUnique.mockResolvedValue(null);

    const response = await PATCH(req);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('Product not found');
  });

  it('should successfully update product and return it', async () => {
    const validPayload = {
      id: 'prod1',
      name: '  New Product Name  ',
      description: 'New description',
      price: '19.99',
      originalPrice: '29.99',
      img: 'new.jpg',
      hoverImg: 'new-hover.jpg',
      categories: ['new-cat'],
      badge: 'Sale',
      stock: '15'
    };

    const req = createRequest(validPayload);

    const existingProduct = { id: 'prod1', name: 'Old Product Name' };
    const updatedProduct = {
      id: 'prod1',
      name: 'New Product Name',
      description: 'New description',
      price: 19.99,
      originalPrice: 29.99,
      img: 'new.jpg',
      hoverImg: 'new-hover.jpg',
      categories: ['new-cat'],
      badge: 'Sale',
      stock: 15
    };

    prismaMock.product.findUnique.mockResolvedValue(existingProduct as unknown as Product);
    prismaMock.product.update.mockResolvedValue(updatedProduct as unknown as Product);

    const response = await PATCH(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(updatedProduct);

    expect(prismaMock.product.update).toHaveBeenCalledWith({
      where: { id: 'prod1' },
      data: {
        name: 'New Product Name', // Should be trimmed
        description: 'New description',
        price: 19.99,
        originalPrice: 29.99,
        img: 'new.jpg',
        hoverImg: 'new-hover.jpg',
        categories: ['new-cat'],
        badge: 'Sale',
        stock: 15
      },
    });
  });
});
