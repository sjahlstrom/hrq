import Breadcrumb from '@/components/Common/bread-crumb'
import React from 'react'
import PurchaseResults from '@/components/(menu)/Pricing/purchase-results'
import PriceCard from '@/components/(menu)/Pricing/price-card'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Pricing"
}
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
