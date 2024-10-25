import { Metadata } from 'next'
import Breadcrumb from '@/components/common/bread-crumb'
import ImageUploader from '@/components/ImageUploader'

export const metadata: Metadata = {
    title: "Upload"
}

export default function UploadPage() {
    return (
        <div>
            <div className="bg-green-200">
                <Breadcrumb
                    pageName="Upload"
                    description="Upload a picture for others to see."
                />
                <ImageUploader />
            </div>
        </div>
    )
}