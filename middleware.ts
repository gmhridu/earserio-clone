import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const session = await getKindeServerSession();

    // Log the session data
    console.log("Session data:", session);

    if (!session?.isAuthenticated) {
      console.log("User is not authenticated, redirecting to login.");

      return NextResponse.redirect(
        "http://localhost:3000/api/auth/login?post_login_redirect_url=http://localhost:3000/dashboard"
      );
    }

    console.log("User is authenticated, proceeding to the dashboard.");
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    // Optionally redirect to a custom error page or handle it gracefully
    return NextResponse.redirect("/error"); // Replace with your error page
  }
}

// Apply this middleware to /dashboard route
export const config = {
  matcher: ["/dashboard"],
};
