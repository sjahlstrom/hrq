import Breadcrumb from '@/components/Common/Breadcrumb'
import ContactForm  from '@/components/(menu)/Contact/Contact'

const ContactPage = () => {
    return (
        <div>
            <div className="bg-hrqColors-skyBlue-100">
                <Breadcrumb
                    pageName="Contact"
                    description="Send us an email and we will get back to you as soon as possible!"
                />
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactPage;





