import About from '@/components/(menu)/About/about'
import Breadcrumb from '@/components/common/bread-crumb'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "About"
}

const AboutPage = () => {
    return (
        <div>
            <div>
                <Breadcrumb
                    pageName="About"
                    minHeight="min-h-[225px]"
                    description="The main 'thrust' is to focus on helping you to find your potential and increasing satisfaction in your relationships."
                />
                <About />
            </div>
        </div>
    )
}

export default AboutPage;
