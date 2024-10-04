import Image from 'next/image'
import SectionTitle from '@/components/Common/SectionTitle'
import React from 'react'

const checkIcon = (
   <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
      <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
   </svg>
)

// Define the props interface for the List component
interface ListProps {
   text: string
}

const AboutSectionOne = () => {
   const List: React.FC<ListProps> = ({ text }) => (
      <p className="mb-5 flex items-center text-lg font-medium text-body-color">
         <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md  bg-opacity-10 text-primary">
            {checkIcon}
         </span>
         {text}
      </p>
   )

   return (
      <section id="about" className="bg-laurel-green pt-16 md:pt-20 lg:pt-28">
         <div className="container">
            <div className="border-b border-body-color/[.15] pb-16 md:pb-20 lg:pb-28 dark:border-white/[.15]">
               <div className="-mx-4 flex flex-wrap items-center">
                  <div className="w-full px-4 lg:w-1/">
                     <SectionTitle
                        title="High Relationship Quotient"
                        paragraph="The main ‘thrust’ is to focus on helping people to find their potential in increasing their satisfaction in their relationship."
                        mb="44px"
                     />

                     <div>
                        Congratulations!   You have come to High RQ’s website.  It’s new and revolutionary.   This site will tell you about the next development in measuring human potential, especially for relationships.

                        What is it?

                        RQ stands for Relationship Quotient.   RQ is a new concept.   Like an IQ test that measures the many abilities that make up your intelligence, RQ measures the  qualities, traits and tendencies that make up your ability to be in a relationship.   There are many, many aspects of your personality, behavioral tendencies, relationship skills that make up the RQ.   Now, there is a test to measure RQ.   Are you a good catch?   Can you go the distance?

                        Why is it important?

                        We all are a mix of many, many traits.   Many of these traits contribute to our relationship successes, many foreshadow failure. Developing a high RQ gives us an advantage in being with others, making lasting relationships successful relationships.   This usually brings dating services to mind, screening potential partners for good relationship skills.  Relationship skills are required everywhere, not just in the dating world.   Think about your relationship with the boss at work, or your neighbor, or your kids, parents, aunts, uncles—you get the idea.  We all need higher RQ’s to make relationships better in ALL venues and functions.

                        Why are you here?

                        You are here to find out your RQ.   Are you a good catch?   Can YOU go the distance in a relationship?   Do you have the traits and abilities required to be a high quality person?   If you’re intrigued and want to know more about the RQ and how it came about, click the button below.

                     </div>


                     <div
                        className=" mb-12 max-w-[570px] lg:mb-0"
                     >
                        <div className="mx-[-12px] flex flex-wrap">
                           <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                              <List text="Premium quality" />
                              <List text="Chasing tail" />
                              <List text="Use this coupon for your next dinner" />
                           </div>

                           <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                              <List text="Test takers" />
                              <List text="Rich documentation" />
                              <List text="People friendly" />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="w-full px-4 lg:w-1/2">
                     <div
                        className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                     >
                        <Image
                           src="/images/about/about-image.svg"
                           alt="about-image"
                           fill
                           className="mx-auto max-w-full lg:mr-0"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default AboutSectionOne
