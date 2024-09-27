import AboutSectionOne from "@/components/(menu)/About/AboutSectionOne";
import AboutSectionTwo from "@/components/(menu)/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

const AboutPage = () => {
  return (
    <div >
      <Breadcrumb
        pageName="About Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <AboutSectionOne />
      {/*<AboutSectionTwo />*/}
    </div>
  );
};

export default AboutPage;
