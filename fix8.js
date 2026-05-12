const fs = require('fs');

let content = fs.readFileSync('src/app/(admin)/admin/actions.ts', 'utf8');

content = content.replace('import { verifyToken } from "@/lib/env";', 'import { env } from "@/lib/env";');

content = content.replace('if (!verifyToken(token)) {', 'if (token !== env.ADMIN_TOKEN) {');

fs.writeFileSync('src/app/(admin)/admin/actions.ts', content);
