import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that are publicly accessible
export const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/components/Analysis(.*)',
    '/api/webhook/clerk(.*)', // Public webhook route
]);

// Define routes that require authentication
const isProtectedRoute = createRouteMatcher([
    '/admin',
    '/users',
    '/stats',
    '/items',
    '/api/checkout', // Protect checkout API
    '/api/createPaymentIntent', // Protect payment intent creation
    '/components/Pricing(.*)', // Protect the pricing or purchase UI
    '/profile',
    '/profile(.*)'
]);

// Middleware to enforce authentication
export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) {
        auth().protect(); // Protect the route if it matches the criteria
    }
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
