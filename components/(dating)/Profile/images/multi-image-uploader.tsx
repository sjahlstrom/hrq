'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2, Upload, X, Save } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const MAX_IMAGES = 3

interface ImageItem {
    id: string
    url: string
}

export default function EnhancedMultiImageUploader() {
    const router = useRouter()
    const [files, setFiles] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadedImages, setUploadedImages] = useState<string[]>([])
    const [existingImages, setExistingImages] = useState<ImageItem[]>([])
    const [error, setError] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)

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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || [])
        const totalImages = files.length + selectedFiles.length + existingImages.length

        if (totalImages > MAX_IMAGES) {
            toast.error(`You can only have up to ${MAX_IMAGES} images total`)
            return
        }

        setFiles(prev => [...prev, ...selectedFiles])
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const removeUploadedImage = (index: number) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index))
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

            setExistingImages(prev => prev.filter(img => img.id !== id))
            toast.success('Image deleted successfully')
        } catch (error) {
            toast.error('Error deleting image')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (files.length === 0) return

        setUploading(true)
        setError(null)
        const uploadedUrls: string[] = []

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                if (!file) {
                    throw new Error(`File at index ${i} is undefined`)
                }

                const filename = encodeURIComponent(file.name)
                const formData = new FormData()
                formData.append('file', file)

                const response = await fetch(`/api/upload?filename=${filename}`, {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    throw new Error(`Upload failed for file: ${file.name}`)
                }

                const data: { url: string } = await response.json()
                if (!data.url) {
                    throw new Error(`Invalid response for file: ${file.name}`)
                }

                uploadedUrls.push(data.url)
                setUploadProgress(((i + 1) / files.length) * 100)
            }

            setUploadedImages(prev => [...prev, ...uploadedUrls])
            setFiles([])
            toast.success('Images uploaded successfully!')
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error uploading files. Please try again.')
            toast.error('Error uploading files')
        } finally {
            setUploading(false)
            setUploadProgress(0)
        }
    }

    const handleDone = async () => {
        if (uploadedImages.length === 0) return

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
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    const remainingSlots = MAX_IMAGES - (existingImages.length + files.length + uploadedImages.length)

    return (
        <Card className=" mt-20 w-full border-dark max-w-2xl mx-auto">
            <CardContent className="p-6 space-y-6">
                <h1 className="text-3xl font-bold mb-4 text-dark text-center">Upload Your Images</h1>
                <p className="text-dark text-center mb-6">
                    Maximum {MAX_IMAGES} images allowed ({remainingSlots} slot(s) remaining)
                </p>

                {existingImages.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl text-dark font-semibold mb-4">Your Existing Images</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <AnimatePresence>
                                {existingImages.map((image) => (
                                    <motion.div
                                        key={image.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative group"
                                    >
                                        <div className="relative h-32 w-full overflow-hidden rounded-lg">
                                            <Image
                                                src={image.url}
                                                alt="Existing image"
                                                fill
                                                className="object-cover transition-transform group-hover:scale-110"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => removeExistingImage(image.id)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {remainingSlots > 0 && (
                        <div className="border border-dark rounded-lg p-6 text-center">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                                id="file-upload"
                                multiple
                                disabled={remainingSlots <= 0 || uploading}
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex flex-col items-center justify-center"
                            >
                                <Upload className="h-12 w-12 text-green-800  mb-2" />
                                <span className="text-dark">Click file(s) to upload</span>
                            </label>
                        </div>
                    )}

                    {files.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold mb-4">Selected Images</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <AnimatePresence>
                                    {files.map((file, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative group"
                                        >
                                            <div className="relative h-32 w-full overflow-hidden rounded-lg">
                                                <Image
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Selected image ${index + 1}`}
                                                    fill
                                                    className="object-cover transition-transform group-hover:scale-110"
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => removeFile(index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    {files.length > 0 && (
                        <Button
                            type="submit"
                            disabled={files.length === 0 || uploading}
                            className="w-full"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Images
                                </>
                            )}
                        </Button>
                    )}

                    {uploading && (
                        <Progress value={uploadProgress} className="w-full" />
                    )}

                    {error && (
                        <p className="text-destructive">{error}</p>
                    )}

                    {uploadedImages.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold mb-4">Newly Uploaded Images</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <AnimatePresence>
                                    {uploadedImages.map((url, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative group"
                                        >
                                            <div className="relative h-32 w-full overflow-hidden rounded-lg">
                                                <Image
                                                    src={url}
                                                    alt={`Uploaded image ${index + 1}`}
                                                    fill
                                                    className="object-cover transition-transform group-hover:scale-110"
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => removeUploadedImage(index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    {uploadedImages.length > 0 && (
                        <Button
                            type="button"
                            onClick={handleDone}
                            disabled={saving}
                            className="w-full"
                            variant="default"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Images
                                </>
                            )}
                        </Button>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}

