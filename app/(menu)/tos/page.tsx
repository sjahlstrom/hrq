import Breadcrumb from "@/components/Common/Breadcrumb";
import React from 'react'
import Tos from '@/components/(menu)/Tos'

const FaqsPage = () => {
   return (
      <div className="bg-gray-600">
         <Breadcrumb
            pageName="Policies Page"
            // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
            description = 'Here is all the long-winded "fine print".'
         />
         <Tos />
      </div>
   );
};

export default FaqsPage;
