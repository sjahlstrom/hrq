import About from '@/components/(menu)/About/About'
import Breadcrumb from '@/components/Common/Breadcrumb'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "About"
}

const AboutPage = () => {
    return (
        <div>
            <div className="bg-green-200">
                <Breadcrumb
                    pageName="About"
                    description="The main 'thrust' is to focus on helping people to find their potential and increasing their satisfaction in their relationship."
                />
                <About />
            </div>
        </div>
    )
}

export default AboutPage;
