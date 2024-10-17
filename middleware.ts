import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export const isPublicRoute = createRouteMatcher(
    [
        '/', '/sign-in(.*)',
        '/sign-up(.*)',
        '/components/Analysis(.*)',
        "/api/webhook/clerk(.*)",
    ]
);

// Define routes that should be protected
const isProtectedRoute = createRouteMatcher([
    '/admin',
    '/users',
]); // Update clerkMiddleware to manually protect routes

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) {
        auth().protect(); // Protect the route if it matches the defined criteria
    }
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};