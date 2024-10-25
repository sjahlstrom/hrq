import Breadcrumb from '@/components/common/bread-crumb'
import React from 'react'
import Tos from '@/components/(menu)/Tos/tos'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Terms of Service"
}

const FaqsPage = () => {
   return (
      <div className="bg-gray-600">
         <Breadcrumb
            pageName="Policies Page"
            description = 'Here is all the long-winded "fine print".'
         />
         <Tos />
      </div>
   );
};

export default FaqsPage;
