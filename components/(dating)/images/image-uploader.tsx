'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            const filename = encodeURIComponent(file.name);
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`/api/upload?filename=${filename}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            setImageUrl(data.url);
        } catch (error) {
            setError('Error uploading file. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        className="w-full"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!file || uploading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>

                {error && (
                    <p className="text-red-500">{error}</p>
                )}

                {imageUrl && (
                    <div className="mt-4">
                        <p className="mb-2">Uploaded successfully!</p>
                        <div className="relative h-48 w-full">
                            <Image
                                src={imageUrl}
                                alt="Uploaded image"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}