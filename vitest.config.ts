import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'node', // Since we're testing a lib function
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    env: {
      ADMIN_TOKEN: 'secret_admin_token'
    }
  },
})
