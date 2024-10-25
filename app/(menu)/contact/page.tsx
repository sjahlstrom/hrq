import Breadcrumb from '@/components/common/bread-crumb'
import ContactForm from '@/components/(menu)/Contact/contact'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Contact"
}

const ContactPage = () => {
    return (
        <div>
            <div className="bg-hrqColors-skyBlue-100">
                <Breadcrumb
                    pageName="Contact"
                    description="Got questions? &nbsp;Want to send feedback? &nbsp;Let us know."
                />
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactPage
