import Breadcrumb from '@/components/Common/bread-crumb'
import { Metadata } from 'next'
import ProfileForm from '@/components/Bio/bio'

export const metadata: Metadata = {
    title: "Bio"
}

const BioPage = () => {
    return (
        <div>
            <div className="bg-hrqColors-slateBlue-500">
                <Breadcrumb
                    pageName="Bio"
                    description="Tell us about yourself"
                />
                <ProfileForm />
            </div>
        </div>
    )
}

export default BioPage;
