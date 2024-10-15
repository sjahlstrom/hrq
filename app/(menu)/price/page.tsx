import Breadcrumb from "@/components/Common/Breadcrumb";
import React from 'react'
import PurchaseResults from '@/components/(menu)/Pricing/PurchaseResults'
import PriceCard from '@/components/(menu)/Pricing/PriceCard'

const PricingPage = () => {
   return (
      <div className="bg-gray-600">
         <Breadcrumb
            pageName="Pricing Page"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
         />
          <PriceCard/>
         <PurchaseResults />
      </div>
   );
};

export default PricingPage;
