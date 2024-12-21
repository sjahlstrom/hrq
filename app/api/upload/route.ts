import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
        return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'File is required' }, { status: 400 });
        }

        // Upload to Vercel Blob
        const blob = await put(filename, file, {
            access: 'public',
        });

        // You might want to save the URL to your database using Prisma here
        // const savedImage = await prisma.image.create({
        //   data: {
        //     url: blob.url,
        //     // ... other fields
        //   }
        // });

        return NextResponse.json(blob);
    } catch (error) {
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}