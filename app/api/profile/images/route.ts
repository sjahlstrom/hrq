// app/api/profile/images/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db';

export async function POST(req: Request) {
    try {
        const { userId: clerkUserId } = auth();
        if (!clerkUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { imageUrls } = await req.json();

        // Find the user record using externalUserId
        const dbUser = await db.user.findFirst({
            where: {
                externalUserId: clerkUserId
            }
        });

        if (!dbUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Create the image entries using the database user.id
        const newImages = await Promise.all(
            imageUrls.map((url: string) => {
                return db.userImage.create({
                    data: {
                        userId: dbUser.id,  // Use the database ID
                        url,
                    }
                });
            })
        );

        return NextResponse.json(newImages);

    } catch (error) {
        console.error('[PROFILE_IMAGES_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const { userId: clerkUserId } = auth();
        if (!clerkUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Find the user record using externalUserId
        const dbUser = await db.user.findFirst({
            where: {
                externalUserId: clerkUserId
            }
        });

        if (!dbUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Use the database user.id to find images
        const images = await db.userImage.findMany({
            where: {
                userId: dbUser.id  // Use the database ID
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(images);

    } catch (error) {
        console.error('[PROFILE_IMAGES_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}