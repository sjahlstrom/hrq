import Breadcrumb from '@/components/Common/Breadcrumb'
import ContactForm from '@/components/(menu)/Contact/Contact'
import { telex } from '@/app/ui/fonts'

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
