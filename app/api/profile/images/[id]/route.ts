// app/api/profile/images/[id]/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { db } from '@/lib/db/db';

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
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

        const imageId = params.id;

        // First, get the image metadata from the database
        const image = await db.userImage.findFirst({
            where: {
                id: imageId,
                userId: dbUser.id
            },
        });

        if (!image) {
            return new NextResponse("Image not found", { status: 404 });
        }

        // Delete from both places
        await Promise.all([
            // Delete the actual file from Vercel Blob
            del(image.url),
            // Delete the metadata from the database
            db.userImage.delete({
                where: {
                    id: imageId,
                },
            })
        ]);

        return new NextResponse(null, { status: 204 });

    } catch (error) {
        console.error('[IMAGE_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}