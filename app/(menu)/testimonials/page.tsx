import Breadcrumb from '@/components/Common/Breadcrumb'
import React from 'react'
import Testimonials from '@/components/(menu)/Testimonials/Testimonials'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Testimonials",
}

const TestimonialsPage = () => {
   return (
      <div className="bg-gray-600">
         <Breadcrumb
            pageName="Testimonials Page"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
         />
         <Testimonials />
      </div>
   )
}

export default TestimonialsPage
