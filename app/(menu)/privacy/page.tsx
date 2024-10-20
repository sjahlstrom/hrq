import Breadcrumb from '@/components/Common/bread-crumb'
import ContactForm from '@/components/(menu)/Contact/contact'
import { Metadata } from 'next'
import React from 'react'
import Privacy from '@/components/(menu)/Privacy/privacy'

export const metadata: Metadata = {
    title: "Privacy Policy",
}

const ContactPage = () => {
    return (
        <div>
            <div className="bg-hrqColors-skyBlue-100">
                <Breadcrumb
                    pageName="Privacy"
                    description="What you tell us is between you and HighRQ.  Your details will never be shared with anyone without your explicit and specific permission."
                />
                <Privacy />
            </div>
        </div>
    )
}

export default ContactPage
