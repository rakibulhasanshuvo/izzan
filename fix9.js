const fs = require('fs');

let content = fs.readFileSync('src/app/api/orders/route.test.ts', 'utf8');

content = content.replace("prismaMock.customer.findUnique.mockImplementation(async (args: any) => {", "prismaMock.customer.findUnique.mockImplementation(async (args: any): Promise<any> => {");

fs.writeFileSync('src/app/api/orders/route.test.ts', content);
