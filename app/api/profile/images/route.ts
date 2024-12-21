import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { userId: clerkUserId } = auth();
        if (!clerkUserId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Get the internal user id from external Clerk id
        const user = await db.user.findUnique({
            where: {
                externalUserId: clerkUserId
            }
        });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        const { imageUrls } = await request.json();

        if (!Array.isArray(imageUrls) || imageUrls.length > 3) {
            return new NextResponse('Invalid request - Maximum 3 images allowed', { status: 400 });
        }

        // First, delete any existing images for this user
        await db.userImage.deleteMany({
            where: {
                userId: user.id
            }
        });

        // Then save the new image URLs
        const savedImages = await db.userImage.createMany({
            data: imageUrls.map(url => ({
                userId: user.id,
                url: url,
                description: 'Profile Image' // Optional description
            })),
        });

        return NextResponse.json({
            success: true,
            count: savedImages.count
        });
    } catch (error) {
        console.error('Error saving user images:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}