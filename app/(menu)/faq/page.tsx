import Breadcrumb from '@/components/common/bread-crumb'
import React from 'react'
import Faq from '@/components/(menu)/Faq/FAQ'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "FAQ"
}

const FaqsPage = () => {
   return (
      <div className="bg-gray-600">
         <Breadcrumb
            pageName="FAQPage"
            description=" The RQ concept is brand new, so people have lots of testQuestions.
                  There will be more, but here are some answers to the ones
                  we’ve gotten so far..."
         />
         <Faq />
      </div>
   );
};

export default FaqsPage;
