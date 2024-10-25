'use client'

import UploadForm from './upload-form'

export default function ImageUploader() {
    return (
        <section className="w-full max-w-4xl mx-auto my-12 p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Upload Your Relationship Photo</h2>
            <p className="text-center mb-6 text-gray-600">Share a meaningful moment from your relationships.</p>
            <UploadForm />
        </section>
    )
}