import { vi } from 'vitest';

vi.mock('next-auth/next', () => ({
  getServerSession: vi.fn().mockResolvedValue({ user: { email: 'admin@example.com' } }),
}));
