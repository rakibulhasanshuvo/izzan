import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validateEnv } from './env';

describe('validateEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    // Clear the env variables that might skip validation
    delete process.env.npm_lifecycle_event;
    delete process.env.NEXT_PHASE;
    // use defineProperty to bypass read-only error
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      configurable: true,
      writable: true
    });
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should not throw if all required envs are present and no secure envs are leaked', () => {
    process.env.ADMIN_TOKEN = 'test-token';
    expect(() => validateEnv()).not.toThrow();
  });

  it('should throw if a required env var is missing', () => {
    delete process.env.ADMIN_TOKEN;
    expect(() => validateEnv()).toThrowError(/Missing required secure environment variables: ADMIN_TOKEN/);
  });

  it('should throw if a sensitive env var is leaked to the client bundle', () => {
    process.env.ADMIN_TOKEN = 'test-token';
    process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY = 'sk_test_123';
    expect(() => validateEnv()).toThrowError(/Secure environment variable leaked to client bundle: NEXT_PUBLIC_STRIPE_SECRET_KEY/);
  });

  it('should not throw if a non-sensitive env var is prefixed with NEXT_PUBLIC_', () => {
    process.env.ADMIN_TOKEN = 'test-token';
    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
    expect(() => validateEnv()).not.toThrow();
  });

  it('should skip validation if npm_lifecycle_event is "build"', () => {
    process.env.npm_lifecycle_event = 'build';
    delete process.env.ADMIN_TOKEN;
    process.env.NEXT_PUBLIC_SECRET_KEY = 'secret';
    expect(() => validateEnv()).not.toThrow();
  });

  it('should skip validation if NODE_ENV is "production"', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      configurable: true,
      writable: true
    });
    delete process.env.ADMIN_TOKEN;
    process.env.NEXT_PUBLIC_SECRET_KEY = 'secret';
    expect(() => validateEnv()).not.toThrow();
  });

  it('should skip validation if NEXT_PHASE is "phase-production-build"', () => {
    process.env.NEXT_PHASE = 'phase-production-build';
    delete process.env.ADMIN_TOKEN;
    process.env.NEXT_PUBLIC_SECRET_KEY = 'secret';
    expect(() => validateEnv()).not.toThrow();
  });
});
