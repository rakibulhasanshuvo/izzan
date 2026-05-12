const fs = require('fs');

let content = fs.readFileSync('src/app/api/orders/route.ts', 'utf8');

// There are a few compilation errors due to the previous merge. Let's fix them before checking tests.
content = content.replace("stockTracker.set(item.id, currentStock - item.quantity);", "stockTracker.set(item.id, (stockTracker.get(item.id) || dbProduct.stock) - item.quantity);");
content = content.replace("where: { id: dbProduct.id },", "where: { id: productId },");
content = content.replace("data: { stock: { decrement: item.quantity } }", "data: { stock: { decrement: quantity } }");

fs.writeFileSync('src/app/api/orders/route.ts', content);
