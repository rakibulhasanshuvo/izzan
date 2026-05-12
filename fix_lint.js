const fs = require('fs');

let content = fs.readFileSync('src/app/api/orders/route.test.ts', 'utf8');
content = content.replace("prismaMock.customer.findUnique.mockImplementation(((args: any) => {", "prismaMock.customer.findUnique.mockImplementation(((args: unknown) => {");
content = content.replace("}) as any);", "}) as unknown as typeof prismaMock.customer.findUnique);");
fs.writeFileSync('src/app/api/orders/route.test.ts', content);

let routeContent = fs.readFileSync('src/app/api/orders/route.ts', 'utf8');
routeContent = routeContent.replace("const productMap = new Map(dbProducts.map(p => [p.id, p]));\n", "");
fs.writeFileSync('src/app/api/orders/route.ts', routeContent);
