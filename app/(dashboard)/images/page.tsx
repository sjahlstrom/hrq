import ImageUploader from '@/components/(dating)/Profile/images/multi-image-uploader'

export default function Page() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Image Upload</h1>
            <ImageUploader />
        </div>
    );
}