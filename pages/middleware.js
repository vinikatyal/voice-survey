

export default withAuth({
  publicRoutes: ["/login", "/signup", "forgot-password"], // Define public routes that don't require authentication
  afterAuth: (auth, req) => {
    // Logic after authentication checks such as logging or redirecting
    if (!auth.sessionId) {
      return NextResponse.redirect("/login");
    }
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Protect these routes
};