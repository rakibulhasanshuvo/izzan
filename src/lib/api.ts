import { NextRequest, NextResponse } from "next/server";

type RouteHandler = (
  req: NextRequest,
  ...args: unknown[]
) => Promise<NextResponse> | NextResponse;

export function apiHandler(handler: RouteHandler, defaultErrorMessage: string = "Internal Server Error"): RouteHandler {
  return async (req: NextRequest, ...args: unknown[]) => {
    try {
      return await handler(req, ...args);
    } catch (error) {
      console.error("API Error:", error);
      return NextResponse.json(
        { error: defaultErrorMessage },
        { status: 500 }
      );
    }
  };
}
