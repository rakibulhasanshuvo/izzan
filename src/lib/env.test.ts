import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { validateEnv } from './env';

describe('validateEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should not throw when required variables are present and no leaked secrets', () => {
    process.env.ADMIN_TOKEN = 'test-token';
    process.env.npm_lifecycle_event = 'dev';

    // We don't overwrite NODE_ENV directly in typescript because it's typed as readonly.
    // Instead we can use Object.defineProperty to bypass TS and set the value for testing if needed
    // However, since we bypassed via cloning above it usually works dynamically.
    // To satisfy TS completely, we cast to any:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.env as any).NODE_ENV = 'development';
    process.env.NEXT_PHASE = 'phase-development-server';

    expect(() => validateEnv()).not.toThrow();
  });

  it('should throw an error when ADMIN_TOKEN is missing', () => {
    delete process.env.ADMIN_TOKEN;
    process.env.npm_lifecycle_event = 'dev';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.env as any).NODE_ENV = 'development';
    process.env.NEXT_PHASE = 'phase-development-server';

    expect(() => validateEnv()).toThrowError(/Missing required secure environment variables: ADMIN_TOKEN/);
  });

  it('should throw an error when a secure variable is leaked to client bundle', () => {
    process.env.ADMIN_TOKEN = 'test-token';
    process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY = 'sk_test_123';
    process.env.npm_lifecycle_event = 'dev';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.env as any).NODE_ENV = 'development';
    process.env.NEXT_PHASE = 'phase-development-server';

    expect(() => validateEnv()).toThrowError(/Secure environment variable leaked to client bundle: NEXT_PUBLIC_STRIPE_SECRET_KEY/);
  });

  it('should bypass validation during build phase', () => {
    delete process.env.ADMIN_TOKEN;
    process.env.npm_lifecycle_event = 'build';

    expect(() => validateEnv()).not.toThrow();
  });

  it('should bypass validation when NODE_ENV is production', () => {
    delete process.env.ADMIN_TOKEN;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.env as any).NODE_ENV = 'production';
    process.env.npm_lifecycle_event = '';

    expect(() => validateEnv()).not.toThrow();
  });
});
