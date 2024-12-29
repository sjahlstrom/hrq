import Breadcrumb from '@/components/common/bread-crumb'
import ContactForm from '@/components/(menu)/Contact/contact'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact',
}

const ContactPage = () => {
    return (
        <div className="bg-hrqColors-skyBlue-100">
            <Breadcrumb
                pageName="Contact"
                minHeight="min-h-[200px]"
                description="Have questions? Want to send feedback? Let us know."
            />
            <ContactForm />
        </div>
    )
}

export default ContactPage
