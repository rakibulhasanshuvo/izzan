const fs = require('fs');

let content = fs.readFileSync('src/app/api/orders/route.test.ts', 'utf8');

// The test file currently has some basic tests, but the route was updated to use findMany.
// I need to update the mocks to support findMany.
content = content.replace(
  /findUnique: vi\.fn\(\)\.mockResolvedValue\(\{ id: 'prod1', name: 'Product 1', price: 100, stock: 10 \}\)/g,
  "findUnique: vi.fn().mockResolvedValue({ id: 'prod1', name: 'Product 1', price: 100, stock: 10 }),\n          findFirst: vi.fn().mockResolvedValue(null),\n          findMany: vi.fn().mockResolvedValue([{ id: 'prod1', name: 'Product 1', price: 100, stock: 10 }])"
);

content = content.replace(
  /findUnique: vi\.fn\(\)\.mockResolvedValue\(null\)/g,
  "findUnique: vi.fn().mockResolvedValue(null),\n          findFirst: vi.fn().mockResolvedValue(null),\n          findMany: vi.fn().mockResolvedValue([])"
);

fs.writeFileSync('src/app/api/orders/route.test.ts', content);
