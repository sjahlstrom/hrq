import Breadcrumb from '@/components/Common/Breadcrumb'
import Features from '@/components/(menu)/Features/Features'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Features"
}
const FeaturesPage = () => {
   return (
      <>
         <Breadcrumb
            pageName="Features Page"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
         />

         <Features />
      </>
   );
};

export default FeaturesPage;
