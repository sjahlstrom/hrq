import { DevelopmentGuard } from '@/components/DevelopmentGuard'
import MultiImageUploader from '@/components/(dating)/Profile/images/multi-image-uploader'

export default function UploadImagesPage() {
    return (
        <DevelopmentGuard>
            <div className="min-h-screen bg-custom-radial from-hrqColors-sunsetOrange-300 to-hrqColors-sunsetOrange-400 py-12">
                <MultiImageUploader />
            </div>
        </DevelopmentGuard>
    )
}
