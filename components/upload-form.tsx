'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return

        setUploading(true)
        const filename = encodeURIComponent(file.name)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch(`/api/upload?filename=${filename}`, {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            const data = await response.json()
            setUploadedUrl(data.url)
        } catch (error) {
            console.error('Error uploading file:', error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Upload Image</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="mb-4"
                    />
                    <Button type="submit" disabled={!file || uploading}>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </form>
            </CardContent>
            {uploadedUrl && (
                <CardFooter>
                    <p>Uploaded image: <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{uploadedUrl}</a></p>
                </CardFooter>
            )}
        </Card>
    )
}