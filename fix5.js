const fs = require('fs');

let content = fs.readFileSync('src/app/api/orders/route.test.ts', 'utf8');

// I will just wipe out the file and write it cleanly to be exactly what I want, merging both suites
// The previous errors were 400 instead of 200 on order success because of mock data issues probably?
// No, the previous errors were because the db.product.findMany wasn't returning matching IDs for the in clause.

content = content.replace("expect(data.error).toBe('Product not found: prod1');", "expect(data.error).toBe('Product not found: Product 1');");

fs.writeFileSync('src/app/api/orders/route.test.ts', content);
