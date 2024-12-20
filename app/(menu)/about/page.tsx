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
                    description="The main 'thrust' is to focus on helping people to find their potential and increasing satisfaction in their relationships."
                />
                <About />
            </div>
        </div>
    )
}

export default AboutPage;
