'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const MAX_IMAGES = 3;

export default function MultiImageUploader() {
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (files.length + selectedFiles.length > MAX_IMAGES) {
            toast.error(`You can only upload up to ${MAX_IMAGES} images`);
            return;
        }
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeUploadedImage = (index: number) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
        toast.success('Image removed successfully');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!files.length) return;

        setUploading(true);
        setError(null);
        const uploadedUrls: string[] = [];

        try {
            for (const file of files) {
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
                uploadedUrls.push(data.url);
            }

            setUploadedImages(prev => [...prev, ...uploadedUrls]);
            setFiles([]);
            toast.success('Images uploaded successfully!');
        } catch (error) {
            setError('Error uploading files. Please try again.');
            toast.error('Error uploading files');
        } finally {
            setUploading(false);
        }
    };

    const handleDone = async () => {
        if (!uploadedImages.length) return;

        setSaving(true);
        try {
            const response = await fetch('/api/profile/images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrls: uploadedImages }),
            });

            if (!response.ok) {
                throw new Error('Failed to save images');
            }

            toast.success('Images saved successfully!');
            router.push('/profile');
        } catch (error) {
            toast.error('Error saving images. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Upload Your Images</h1>
            <p className="text-gray-600 mb-4">Maximum {MAX_IMAGES} images allowed</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="w-full"
                        multiple
                        disabled={files.length >= MAX_IMAGES || uploading}
                    />
                </div>

                {/* Selected files preview */}
                {files.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                        {files.map((file, index) => (
                            <div key={index} className="relative">
                                <div className="relative h-32 w-full">
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt={`Selected image ${index + 1}`}
                                        fill
                                        className="object-cover rounded"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-1 right-1"
                                    onClick={() => removeFile(index)}
                                >
                                    ✕
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={!files.length || uploading}
                    className="w-full"
                >
                    {uploading ? 'Uploading...' : 'Upload Images'}
                </Button>

                {error && (
                    <p className="text-red-500">{error}</p>
                )}

                {/* Uploaded images display */}
                {uploadedImages.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {uploadedImages.map((url, index) => (
                                <div key={index} className="relative">
                                    <div className="relative h-32 w-full">
                                        <Image
                                            src={url}
                                            alt={`Uploaded image ${index + 1}`}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-1 right-1"
                                        onClick={() => removeUploadedImage(index)}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {uploadedImages.length > 0 && (
                    <Button
                        type="button"
                        onClick={handleDone}
                        disabled={saving}
                        className="w-full bg-green-500 hover:bg-green-600"
                    >
                        {saving ? 'Saving...' : 'Done'}
                    </Button>
                )}
            </form>
        </div>
    );
}