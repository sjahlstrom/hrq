import Breadcrumb from '@/components/Common/Breadcrumb'
import React from 'react'
import Services from '@/components/(menu)/Services/Services'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Services"
}
const ServicesPage = () => {
    return (
        <>
            <Breadcrumb
                pageName="Services Page"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
            />

            <Services />
        </>
    );
};

export default ServicesPage;
