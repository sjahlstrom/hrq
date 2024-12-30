'use server'
import { db } from "@/lib/db/db";

export async function getUserProfile(userId: string) {
    try {
        return await db.profile.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        email: true,
                        username: true,
                        images: true,
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw new Error("Failed to fetch user profile");
    }
}