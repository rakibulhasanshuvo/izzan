process.env.ADMIN_TOKEN = "test-token";
process.env.NEXTAUTH_URL = "http://localhost";
process.env.NEXTAUTH_SECRET = "secret";

import { vi } from "vitest";
import * as auth from "@/lib/auth";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
vi.spyOn(auth, "checkAdminAuth").mockResolvedValue(true as any);
