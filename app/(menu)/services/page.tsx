import Breadcrumb from '@/components/common/bread-crumb'
import React from 'react'
import Services from '@/components/(menu)/Services/services'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Services',
}
const ServicesPage = () => {
    return (
        <>
            <Breadcrumb
                pageName="Services Page"
                minHeight="min-h-[220px]"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
            />

            <Services />
        </>
    )
}

export default ServicesPage
