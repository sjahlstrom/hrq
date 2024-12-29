'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2, Upload, X, ImagePlus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const MAX_IMAGES = 3

interface ImageItem {
    id: string
    url: string
}

export default function MultiImageUploader() {
    const router = useRouter()
    const [files, setFiles] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)
    const [uploadedImages, setUploadedImages] = useState<string[]>([])
    const [existingImages, setExistingImages] = useState<ImageItem[]>([])
    const [error, setError] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)
    const [dragActive, setDragActive] = useState(false)

    useEffect(() => {
        const fetchExistingImages = async () => {
            try {
                const response = await fetch('/api/profile/images')
                if (response.ok) {
                    const data = await response.json()
                    setExistingImages(data)
                }
            } catch (error) {
                console.error('Error fetching images:', error)
                toast.error('Error loading existing images')
            } finally {
                setLoading(false)
            }
        }

        fetchExistingImages()
    }, [])

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const droppedFiles = Array.from(e.dataTransfer.files)
        const imageFiles = droppedFiles.filter((file) =>
            file.type.startsWith('image/')
        )
        const totalImages =
            files.length + imageFiles.length + existingImages.length

        if (totalImages > MAX_IMAGES) {
            toast.error(`You can only have up to ${MAX_IMAGES} images total`)
            return
        }

        setFiles((prev) => [...prev, ...imageFiles])
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || [])
        const totalImages =
            files.length + selectedFiles.length + existingImages.length

        if (totalImages > MAX_IMAGES) {
            toast.error(`You can only have up to ${MAX_IMAGES} images total`)
            return
        }

        setFiles((prev) => [...prev, ...selectedFiles])
    }

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const removeUploadedImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index))
        toast.success('Image removed successfully')
    }

    const removeExistingImage = async (id: string) => {
        try {
            const response = await fetch(`/api/profile/images/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete image')
            }

            setExistingImages((prev) => prev.filter((img) => img.id !== id))
            toast.success('Image deleted successfully')
        } catch (error) {
            toast.error('Error deleting image')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!files.length) return

        setUploading(true)
        setError(null)
        const uploadedUrls: string[] = []

        try {
            for (const file of files) {
                const filename = encodeURIComponent(file.name)
                const formData = new FormData()
                formData.append('file', file)

                const response = await fetch(
                    `/api/upload?filename=${filename}`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                )

                if (!response.ok) {
                    throw new Error('Upload failed')
                }

                const data = await response.json()
                uploadedUrls.push(data.url)
            }

            setUploadedImages((prev) => [...prev, ...uploadedUrls])
            setFiles([])
            toast.success('Images uploaded successfully!')
        } catch (error) {
            setError('Error uploading files. Please try again.')
            toast.error('Error uploading files')
        } finally {
            setUploading(false)
        }
    }

    const handleDone = async () => {
        if (!uploadedImages.length) return

        setSaving(true)
        try {
            const response = await fetch('/api/profile/images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrls: uploadedImages }),
            })

            if (!response.ok) {
                throw new Error('Failed to save images')
            }

            toast.success('Images saved successfully!')
            router.refresh()
            router.push('/profile')
        } catch (error) {
            toast.error('Error saving images. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )
    }

    const remainingSlots =
        MAX_IMAGES -
        (existingImages.length + files.length + uploadedImages.length)
    const progress =
        ((existingImages.length + files.length + uploadedImages.length) /
            MAX_IMAGES) *
        100

    return (
        <div className="max-w-3xl mx-auto p-8 space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl text-dark font-bold tracking-tight">
                    Image Gallery
                </h1>
                <div className="flex items-center gap-4">
                    <Progress value={progress} className="w-full" />
                    <span className="text-sm text-gray-700 whitespace-nowrap">
                        {remainingSlots} slots remaining
                    </span>
                </div>
            </div>

            {existingImages.length > 0 && (
                <Card className="border-dark shadow-hrqColors-coral-500"
                >
                    <CardContent className="pt-6">
                        <h2 className="text-xl text-dark font-semibold mb-4">
                            Current Images
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            {existingImages.map((image) => (
                                <div
                                    key={image.id}
                                    className="group relative rounded-lg overflow-hidden"
                                >
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={image.url}
                                            alt="Existing image"
                                            fill
                                            className="object-cover transition-transform group-hover:scale-105"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() =>
                                            removeExistingImage(image.id)
                                        }
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {remainingSlots > 0 && (
                    <Card className="border-dark">
                        <CardContent className="pt-6">
                            <div
                                className={`relative  p-8 transition-colors ${
                                    dragActive
                                        ? 'border-primary bg-primary/5'
                                        : 'border-gray-200'
                                }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    multiple
                                    disabled={remainingSlots <= 0 || uploading}
                                />
                                <div className="flex flex-col  items-center justify-center gap-2 text-center">
                                    <ImagePlus className="h-10 w-10 text-green-800" />
                                    <p className="text-lg text-dark font-medium">
                                        Drag images here or click to browse
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Supports: JPG, PNG, GIF
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {files.length > 0 && (
                    <Card className="border-dark shadow-hrqColors-coral-500" >
                        <CardContent className="pt-6">
                            <h2 className="text-xl text-dark font-semibold mb-4">
                                Selected Images
                            </h2>
                            <div className="grid grid-cols-3 gap-4">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="group relative rounded-lg overflow-hidden"
                                    >
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={`Selected image ${index + 1}`}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => removeFile(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <Button
                                type="submit"
                                disabled={!files.length || uploading}
                                className="w-full mt-4"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="text-green-700  mr-2 h-4 w-4" />
                                        <span className="text-gray-900">Upload Images</span>

                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {error && (
                    <div className="rounded-lg bg-red-50 p-4 text-red-600">
                        {error}
                    </div>
                )}

                {uploadedImages.length > 0 && (
                    <Card>
                        <CardContent className="pt-6">
                            <h2 className="text-xl text-dark font-semibold mb-4">
                                Newly Uploaded Images
                            </h2>
                            <div className="grid grid-cols-3 gap-4">
                                {uploadedImages.map((url, index) => (
                                    <div
                                        key={index}
                                        className="group relative rounded-lg overflow-hidden"
                                    >
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={url}
                                                alt={`Uploaded image ${index + 1}`}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() =>
                                                removeUploadedImage(index)
                                            }
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <Button
                                type="button"
                                onClick={handleDone}
                                disabled={saving}
                                className="w-full mt-4 bg-green-600 hover:bg-green-700"
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
                        </CardContent>
                    </Card>
                )}
            </form>
        </div>
    )
}
