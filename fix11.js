const fs = require('fs');

let content = fs.readFileSync('src/app/api/orders/route.test.ts', 'utf8');

content = content.replace(`    // Mock findUnique to return existing customer
    prismaMock.customer.findUnique.mockImplementation(((args: any) => {


        return Promise.resolve({ id: 'cust1', name: 'John Doe', phone: '01712345678', email: 'john@example.com', zila: 'Dhaka', upozila: 'Savar', location: 'Dhaka', tier: 'Bronze', totalSpend: 0, createdAt: new Date(), updatedAt: new Date() });
      }
      return Promise.resolve(null);
    }) as any);
      const typedArgs = args as { where?: { phone?: string, email?: string } };
      if (typedArgs?.where?.phone) {


    });`, `    // Mock findUnique to return existing customer
    prismaMock.customer.findUnique.mockImplementation(async (args: any): Promise<any> => {
      const typedArgs = args as { where?: { phone?: string, email?: string } };
      if (typedArgs?.where?.phone) {
        return Promise.resolve({ id: 'cust1', name: 'John Doe', phone: '01712345678', email: 'john@example.com', zila: 'Dhaka', upozila: 'Savar', location: 'Dhaka', tier: 'Bronze', totalSpend: 0, createdAt: new Date(), updatedAt: new Date() });
      }
      return Promise.resolve(null);
    });`);

fs.writeFileSync('src/app/api/orders/route.test.ts', content);
