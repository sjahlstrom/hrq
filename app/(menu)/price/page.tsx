import Breadcrumb from "@/components/Common/Breadcrumb";
import React from 'react'
import Pricing from '@/components/(menu)/Pricing'

const PricingPage = () => {
   return (
      <div className="bg-gray-600">
         <Breadcrumb
            pageName="Pricing Page"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
         />
         <Pricing />
      </div>
   );
};

export default PricingPage;
