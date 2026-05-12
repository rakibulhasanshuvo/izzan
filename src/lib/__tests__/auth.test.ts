import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkAdminAuth } from "../auth";
import * as nextAuth from "next-auth/next";

vi.mock("next-auth/next", () => ({
  getServerSession: vi.fn(),
}));

describe("checkAdminAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return false if no session is present", async () => {
    vi.mocked(nextAuth.getServerSession).mockResolvedValue(null);
    const result = await checkAdminAuth();
    expect(result).toBe(false);
  });

  it("should return true if session is present", async () => {
    vi.mocked(nextAuth.getServerSession).mockResolvedValue({
      user: { id: "user_1", name: "Admin" },
      expires: "timestamp",
    });
    const result = await checkAdminAuth();
    expect(result).toBe(true);
  });
});
