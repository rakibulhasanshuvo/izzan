// Set up dummy environment variables so top-level invocations (like in src/lib/env.ts)
// don't fail during test imports.
process.env.ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'test-admin-token';
