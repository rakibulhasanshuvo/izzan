import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'node', // Since we're testing a lib function
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['src/app/api/admin/products/route.test.ts'], // Native node:test runner
    env: {
      ADMIN_TOKEN: 'secret_admin_token'
    }
  },
})
