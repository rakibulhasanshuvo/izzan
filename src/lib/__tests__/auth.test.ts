import { NextRequest } from "next/server";
import { describe, it, expect, vi } from "vitest";
import { checkAdminAuth } from "../auth";

// Mock the environment variable
vi.mock("../env", () => ({
  env: {
    ADMIN_TOKEN: "secret_admin_token",
  },
}));

describe("checkAdminAuth", () => {
  it("should return false if no authorization header is present", () => {
    const req = new NextRequest("http://localhost");
    expect(checkAdminAuth(req)).toBe(false);
  });

  it("should return false if authorization header does not start with Bearer", () => {
    const req = new NextRequest("http://localhost", {
      headers: {
        authorization: "Basic some_token",
      },
    });
    expect(checkAdminAuth(req)).toBe(false);
  });

  it("should return false if token is incorrect", () => {
    const req = new NextRequest("http://localhost", {
      headers: {
        authorization: "Bearer wrong_token",
      },
    });
    expect(checkAdminAuth(req)).toBe(false);
  });

  it("should return true if token matches ADMIN_TOKEN", () => {
    const req = new NextRequest("http://localhost", {
      headers: {
        authorization: "Bearer secret_admin_token",
      },
    });
    expect(checkAdminAuth(req)).toBe(true);
  });
});
