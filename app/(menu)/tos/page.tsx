import Breadcrumb from "@/components/Common/Breadcrumb";
import React from 'react'
import Tos from '@/components/(menu)/Tos/TOS'

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
