const fs = require('fs');

let content = fs.readFileSync('src/app/api/orders/route.test.ts', 'utf8');

content = content.replace("prismaMock.customer.findUnique.mockImplementation(async (args: any): Promise<any> => {", "prismaMock.customer.findUnique.mockImplementation(((args: any) => {\n      const typedArgs = args as { where?: { phone?: string, email?: string } };\n      if (typedArgs?.where?.phone) {\n        return Promise.resolve({ id: 'cust1', name: 'John Doe', phone: '01712345678', email: 'john@example.com', zila: 'Dhaka', upozila: 'Savar', location: 'Dhaka', tier: 'Bronze', totalSpend: 0, createdAt: new Date(), updatedAt: new Date() });\n      }\n      return Promise.resolve(null);\n    }) as any);");

content = content.replace("const typedArgs = args as { where?: { phone?: string, email?: string } };", "");
content = content.replace("if (typedArgs?.where?.phone) {", "");
content = content.replace("return { id: 'cust1', name: 'John Doe', phone: '01712345678', email: 'john@example.com', zila: 'Dhaka', upozila: 'Savar', location: 'Dhaka', tier: 'Bronze', totalSpend: 0, createdAt: new Date(), updatedAt: new Date() } as any;", "");
content = content.replace("}\n      return null;", "");


fs.writeFileSync('src/app/api/orders/route.test.ts', content);
