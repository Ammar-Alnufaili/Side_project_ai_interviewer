import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher([
    "/dashboard(.*)",
    "/interviews(.*)",
    "/results(.*)",
    "/candidates(.*)",
    "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtected(req)) {
        await auth.protect(); // redirects to /auth/sign-in if not signed in
    }
});

export const config = {
    // Skip static files, _next, images, etc.
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
