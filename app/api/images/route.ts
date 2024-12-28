// app/api/profile/images/route.ts
import { NextResponse } from 'next/server';
import { getAuthenticatedDbUser, createUserImages, getUserImages } from '@/utils/user';
import { AuthenticationError, UserNotFoundError } from '@/utils/user';

export async function POST(req: Request) {
    try {
        const user = await getAuthenticatedDbUser();
        const { imageUrls } = await req.json();

        const newImages = await createUserImages(user.id, imageUrls);
        return NextResponse.json(newImages);

    } catch (error) {
        console.error('[PROFILE_IMAGES_POST]', error);

        if (error instanceof AuthenticationError) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (error instanceof UserNotFoundError) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const user = await getAuthenticatedDbUser();
        const images = await getUserImages(user.id);

        return NextResponse.json(images);

    } catch (error) {
        console.error('[PROFILE_IMAGES_GET]', error);

        if (error instanceof AuthenticationError) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (error instanceof UserNotFoundError) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse("Internal Error", { status: 500 });
    }
}