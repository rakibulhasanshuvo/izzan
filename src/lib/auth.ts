import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

/**
 * Basic authentication check for admin routes.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function checkAdminAuth(req: NextRequest): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return false;
  }

  return true;
}

/**
 * Higher-order function to wrap API route handlers with authentication check.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withAuth(handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse> | NextResponse) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (req: NextRequest, ...args: any[]) => {
    const isAuthenticated = await checkAdminAuth(req);
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return handler(req, ...args);
  };
}
