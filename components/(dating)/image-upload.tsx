'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Alert, AlertTitle } from '@/components/ui/alert';

interface ImageUploadProps {
    onImagesChange?: (files: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesChange }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState('');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (files.length + acceptedFiles.length > 3) {
            setError('Maximum 3 images allowed');
            return;
        }
        const newFiles = acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setFiles(prev => [...prev, ...newFiles]);
        onImagesChange?.([...files, ...newFiles]);
        setError('');
    }, [files, onImagesChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        maxSize: 5242880
    });

    const removeFile = (name: string) => {
        const updatedFiles = files.filter(file => file.name !== name);
        setFiles(updatedFiles);
        onImagesChange?.(updatedFiles);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Upload Your Images</h1>
                <p className="text-gray-500">
                    Maximum 3 images allowed ({3 - files.length} slots remaining)
                </p>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            )}

            <div
                {...getRootProps()}
                className={`
                    border-2 border-dashed rounded-xl p-8 text-center
                    transition-colors duration-200 ease-in-out cursor-pointer
                    ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                `}
            >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                    Drag & drop images here, or click to select files
                </p>
                <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                </p>
            </div>

            {files.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900">Your Images</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {files.map((file: any) => (
                            <div
                                key={file.name}
                                className="relative group rounded-lg overflow-hidden border border-gray-200"
                            >
                                <div className="aspect-w-16 aspect-h-9 relative">
                                    <Image
                                        src={file.preview}
                                        alt={file.name}
                                        layout="fill"
                                        objectFit="cover"
                                        onLoad={() => URL.revokeObjectURL(file.preview)}
                                    />
                                </div>
                                <button
                                    onClick={() => removeFile(file.name)}
                                    className="absolute top-2 right-2 p-1 rounded-full bg-white/80
                                        hover:bg-white/95 transition-colors group-hover:opacity-100
                                        opacity-0 shadow-sm"
                                    aria-label={`Remove ${file.name}`}
                                >
                                    <X className="h-4 w-4 text-gray-600" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;

