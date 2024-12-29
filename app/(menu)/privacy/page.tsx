import Breadcrumb from '@/components/common/bread-crumb'
import { Metadata } from 'next'
import React from 'react'
import Privacy from '@/components/(menu)/Privacy/privacy'

export const metadata: Metadata = {
    title: 'Privacy Policy',
}

const ContactPage = () => {
    return (
        <div>
            <div className="bg-hrqColors-skyBlue-100">
                <Breadcrumb
                    pageName="Privacy"
                    minHeight="min-h-[220px]"
                    description="What you tell us is between you and HighRQ.  Your details will never be shared with anyone without your explicit and specific permission."
                />
                <Privacy />
            </div>
        </div>
    )
}

export default ContactPage
