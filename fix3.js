const fs = require('fs');

let content = fs.readFileSync('src/app/api/orders/route.test.ts', 'utf8');

// I also need to add the new tests I wrote previously to this file that got overwritten by the rebase

content = content.replace("});", `});

  describe('Order items validation inside transaction', () => {
    it('should fail when item has invalid structure (missing id)', async () => {
      const requestData = {
        ...validPayload,
        items: [{ quantity: 1, name: 'Test Product' }], // missing id
      };

      const req = createRequest(requestData);

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        const txMock = {
          product: {
            findUnique: vi.fn(),
            findFirst: vi.fn(),
            findMany: vi.fn().mockResolvedValue([]),
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
        ...validPayload,
        items: [{ id: 'prod_1', name: 'Test Product' }], // missing quantity
      };

      const req = createRequest(requestData);

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        const txMock = {
          product: {
            findUnique: vi.fn(),
            findFirst: vi.fn(),
            findMany: vi.fn().mockResolvedValue([]),
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
        ...validPayload,
        items: [{ id: 'prod_1', quantity: 0, name: 'Test Product' }], // missing quantity
      };

      const req = createRequest(requestData);

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        const txMock = {
          product: {
            findUnique: vi.fn(),
            findFirst: vi.fn(),
            findMany: vi.fn().mockResolvedValue([]),
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
        ...validPayload,
        items: [{ id: 'prod_1', quantity: -5, name: 'Test Product' }], // missing quantity
      };

      const req = createRequest(requestData);

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        const txMock = {
          product: {
            findUnique: vi.fn(),
            findFirst: vi.fn(),
            findMany: vi.fn().mockResolvedValue([]),
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
  });
});`);

fs.writeFileSync('src/app/api/orders/route.test.ts', content);
