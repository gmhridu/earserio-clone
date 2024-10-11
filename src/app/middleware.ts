import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { isAuthenticated } = getKindeServerSession();
  if (!isAuthenticated) {
    return NextResponse.redirect(
      new URL(
        "/api/auth/login?post_login_redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard",
        request.url
      )
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard"],
};
