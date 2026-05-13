import { vi } from 'vitest';

process.env.ADMIN_TOKEN = "test-token";

vi.mock('@/lib/auth-options', () => ({
  authOptions: {},
}));

vi.mock('next-auth/next', () => ({
  getServerSession: vi.fn().mockResolvedValue({ user: { email: 'admin@example.com' } }),
}));
