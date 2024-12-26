'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const MAX_IMAGES = 3;

interface ImageItem {
    id: string;
    url: string;
}

export default function MultiImageUploader() {
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<ImageItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExistingImages = async () => {
            try {
                const response = await fetch('/api/profile/images');
                if (response.ok) {
                    const data = await response.json();
                    setExistingImages(data);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
                toast.error('Error loading existing images');
            } finally {
                setLoading(false);
            }
        };

        fetchExistingImages();
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const totalImages = files.length + selectedFiles.length + existingImages.length;

        if (totalImages > MAX_IMAGES) {
            toast.error(`You can only have up to ${MAX_IMAGES} images total`);
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

    const removeExistingImage = async (id: string) => {
        try {
            const response = await fetch(`/api/profile/images/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete image');
            }

            setExistingImages(prev => prev.filter(img => img.id !== id));
            toast.success('Image deleted successfully');
        } catch (error) {
            toast.error('Error deleting image');
        }
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
            router.refresh();
            router.push('/profile');
        } catch (error) {
            toast.error('Error saving images. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    const remainingSlots = MAX_IMAGES - (existingImages.length + files.length + uploadedImages.length);

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Upload Your Images</h1>
            <p className="text-gray-600 mb-4">
                Maximum {MAX_IMAGES} images allowed ({remainingSlots} slots remaining)
            </p>

            {/* Existing images display */}
            {existingImages.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Your Existing Images</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {existingImages.map((image) => (
                            <div key={image.id} className="relative">
                                <div className="relative h-32 w-full">
                                    <Image
                                        src={image.url}
                                        alt="Existing image"
                                        fill
                                        className="object-cover rounded"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-1 right-1"
                                    onClick={() => removeExistingImage(image.id)}
                                >
                                    ✕
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {remainingSlots > 0 && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="w-full"
                            multiple
                            disabled={remainingSlots <= 0 || uploading}
                        />
                    </div>
                )}

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

                {files.length > 0 && (
                    <Button
                        type="submit"
                        disabled={!files.length || uploading}
                        className="w-full"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            'Upload Images'
                        )}
                    </Button>
                )}

                {error && (
                    <p className="text-red-500">{error}</p>
                )}

                {/* Newly uploaded images display */}
                {uploadedImages.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Newly Uploaded Images</h2>
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
                        {saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Images'
                        )}
                    </Button>
                )}
            </form>
        </div>
    );
}