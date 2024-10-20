import SectionTitle from '@/components/Common/section-title'
import SingleFeature from "./single-feature";
import featuresData from "./featuresData";
import { nunito } from '@/app/ui/fonts'

const Features = () => {
  return (
    <>
      <section
        id="features"
        className="bg-purple py-16 md:py-20 lg:py-28"
      >
          <div className="container">
              <SectionTitle
                  title="Main Features"
                  paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
                  center
              />

              <div className={`${nunito.className}  grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3`}>
                  {featuresData.map((feature) => (
                      <SingleFeature key={feature.id} feature={feature} />
                  ))}
              </div>
          </div>
      </section>
    </>
  );
};

export default Features;
