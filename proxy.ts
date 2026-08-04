// proxy.ts (renamed from middleware.ts)
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {  // Renamed from 'middleware' to 'proxy'
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    
    // Admin-only routes
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    
    // Sales and Admin can access /dashboard
    if (path.startsWith("/dashboard") && !token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};