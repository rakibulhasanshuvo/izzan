const fs = require('fs');

let content = fs.readFileSync('src/app/api/orders/route.test.ts', 'utf8');

content = content.replace("return { id: 'cust1', name: 'John Doe', phone: '01712345678', email: 'john@example.com', zila: 'Dhaka', upozila: 'Savar', location: 'Dhaka', totalSpend: 0, createdAt: new Date(), updatedAt: new Date() };", "return { id: 'cust1', name: 'John Doe', phone: '01712345678', email: 'john@example.com', zila: 'Dhaka', upozila: 'Savar', location: 'Dhaka', tier: 'Bronze', totalSpend: 0, createdAt: new Date(), updatedAt: new Date() } as any;");

content = content.replace("prismaMock.customer.findUnique.mockImplementation(async (args: unknown) => {", "prismaMock.customer.findUnique.mockImplementation(async (args: any) => {");

fs.writeFileSync('src/app/api/orders/route.test.ts', content);
