import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db/db';
import { redirect } from 'next/navigation';
import { DbUser } from '@/types/user'

export class AuthenticationError extends Error {
    constructor(message = 'Not authenticated') {
        super(message);
        this.name = 'AuthenticationError';
    }
}

export class UserNotFoundError extends Error {
    constructor(message = 'User not found') {
        super(message);
        this.name = 'UserNotFoundError';
    }
}

/**
 * Gets the currently authenticated user's database record
 * Use this in API routes and server components where you need the full user object
 */
export async function getAuthenticatedDbUser(options: {
    includeImages?: boolean;
    includePreferences?: boolean;
    includeBio?: boolean;
} = {}): Promise<DbUser> {
    const { userId: clerkUserId } = auth();

    if (!clerkUserId) {
        throw new AuthenticationError();
    }

    const dbUser = await db.user.findUnique({
        where: { externalUserId: clerkUserId },
        include: {
            images: options.includeImages,
            preferences: options.includePreferences,
            bio: options.includeBio,
        }
    });

    if (!dbUser) {
        throw new UserNotFoundError();
    }

    return dbUser;
}

/**
 * Protected route wrapper - use in page.tsx files
 * Redirects to sign-in if not authenticated
 */
export async function requireAuth() {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    return userId;
}

/**
 * Gets a user's images
 * Uses the internal database ID
 */
export async function getUserImages(userId: string) {
    return db.userImage.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
}

/**
 * Creates user images
 * Uses the internal database ID
 */
export async function createUserImages(userId: string, imageUrls: string[]) {
    return Promise.all(
        imageUrls.map(url =>
            db.userImage.create({
                data: {
                    userId,
                    url,
                }
            })
        )
    );
}

/**
 * Safe user response creator
 * Removes sensitive fields for client-side use
 */
export function createSafeUserResponse(user: DbUser) {
    const { externalUserId, stripeCustomerId, ...safeUser } = user;
    return safeUser;
}