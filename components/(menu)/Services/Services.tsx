'use client'

import React from 'react'
import FaqItem from '@/components/(menu)/FaqItem/FAQItem'

const ServicesPage = () => {
   return (
      <>
         <section
            id="tos"
            className="relative z-10 bg-laurel-green overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
         >
            <div className="container">
               <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4">
                     <div
                        className="mx-auto max-w-[800px] "
                     >
                        <h1 className="mb-2 text-3xl font-bold leading-tight text-black dark:text-green-800 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                           Our Services
                        </h1>

                        <h1 className="font-bold text-black text-left mb-4">
                           Congratulations! You have come to High RQ’s website.
                           It’s new and revolutionary. This site will tell you
                           about the next development in measuring human
                           potential, especially for relationships.
                        </h1>

                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="Level 1 Services"
                              answer="Sign up, provide an email address, pay the fee.   You will get an email that has a link.  Click on the link to open up the HighRQ test.  Take the test, click submit, then wait for your individual report to arrive in your email.   Level 1 services is quick and easy.   You can stop there if you want.  You’ll know your RQ and have bragging rights.   You’ll also know your strengths in a relationship,   You’ll also know where you need work.   You can take these to the bank when it comes to meeting that next someone special.   This score is invaluable to employers who want higher quality applicants, for ANY position.   If you want to go further, soon, we’ll have the next level of service up and running."
                           />
                        </div>

                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="Level 2 Services"
                              answer="Now you have your RQ results and where you are strong (or?).   Do you want to compare your scores with someone else?   A partner or someone you just met?   We will do that for you.   That person has to do what you just did, take the test, provide the needed information (plus a special CQ code to only link you and another person) and pay the fee.   The fee will be reduced for the second person, so if you both agree to do this before hand, both of you will pay less.   The ensuing report will provide a CQ, or Compatibility Quotient."
                           />
                        </div>

                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="Level 3 Services"
                              answer="This service will follow the roll-out of the CQ.   What if you don’t know the person of interest but would like to know their RQ before going on that first date?   What if you want greater selection in potential mates and want the RQ information to work for you beforehand?  Level 3 Services will be a dating site based on the RQ scores, again, not the superficial stuff.   Matches will be made on the basis of the RQ configuration primarily, plus we’ll add demographic testQuestions (location, age, straight/gay/trans/ race, height, income, etc.)   These 40 additional dimensions are important, from a practical point of view because some qualities in others we know will be objectionable.   We understand that, so we ask ahead of time, eliminate them as obstacles, and then look at compatibility after that using the RQ’s.   Level 3 Services will provide the same CQ analysis as Level 2 Services, but with strangers–those people seeking high quality relationships without yet knowing each other.  We haven’t worked on this yet, but there is potential to give the RQ test to a group, say employees in a company, and then look at the relationship between any two people.  Who knows how far this might go?  This gets into some good psychological stuff, so If you want any of this, you have to read and sign the legal disclaimers."
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="absolute top-0 right-0 z-[-1] opacity-30 lg:opacity-100">
               {/*<svg*/}
               {/*   width="450"*/}
               {/*   height="556"*/}
               {/*   viewBox="0 0 450 556"*/}
               {/*   fill="none"*/}
               {/*   xmlns="http://www.w3.org/2000/svg"*/}
               {/*>*/}
               {/*   <circle*/}
               {/*      cx="277"*/}
               {/*      cy="63"*/}
               {/*      r="225"*/}
               {/*      fill="url(#paint0_linear_25:217)"*/}
               {/*   />*/}
               {/*   <circle*/}
               {/*      cx="17.9997"*/}
               {/*      cy="182"*/}
               {/*      r="18"*/}
               {/*      fill="url(#paint1_radial_25:217)"*/}
               {/*   />*/}
               {/*   <circle*/}
               {/*      cx="76.9997"*/}
               {/*      cy="288"*/}
               {/*      r="34"*/}
               {/*      fill="url(#paint2_radial_25:217)"*/}
               {/*   />*/}
               {/*   <circle*/}
               {/*      cx="325.486"*/}
               {/*      cy="302.87"*/}
               {/*      r="180"*/}
               {/*      transform="rotate(-37.6852 325.486 302.87)"*/}
               {/*      fill="url(#paint3_linear_25:217)"*/}
               {/*   />*/}
               {/*   <circle*/}
               {/*      opacity="0.8"*/}
               {/*      cx="184.521"*/}
               {/*      cy="315.521"*/}
               {/*      r="132.862"*/}
               {/*      transform="rotate(114.874 184.521 315.521)"*/}
               {/*      stroke="url(#paint4_linear_25:217)"*/}
               {/*   />*/}
               {/*   <circle*/}
               {/*      opacity="0.8"*/}
               {/*      cx="356"*/}
               {/*      cy="290"*/}
               {/*      r="179.5"*/}
               {/*      transform="rotate(-30 356 290)"*/}
               {/*      stroke="url(#paint5_linear_25:217)"*/}
               {/*   />*/}
               {/*   <circle*/}
               {/*      opacity="0.8"*/}
               {/*      cx="191.659"*/}
               {/*      cy="302.659"*/}
               {/*      r="133.362"*/}
               {/*      transform="rotate(133.319 191.659 302.659)"*/}
               {/*      fill="url(#paint6_linear_25:217)"*/}
               {/*   />*/}
               {/*   <defs>*/}
               {/*      <linearGradient*/}
               {/*         id="paint0_linear_25:217"*/}
               {/*         x1="-54.5003"*/}
               {/*         y1="-178"*/}
               {/*         x2="222"*/}
               {/*         y2="288"*/}
               {/*         gradientUnits="userSpaceOnUse"*/}
               {/*      >*/}
               {/*         <stop stopColor="#4A6CF7" />*/}
               {/*         <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />*/}
               {/*      </linearGradient>*/}
               {/*      <radialGradient*/}
               {/*         id="paint1_radial_25:217"*/}
               {/*         cx="0"*/}
               {/*         cy="0"*/}
               {/*         r="1"*/}
               {/*         gradientUnits="userSpaceOnUse"*/}
               {/*         gradientTransform="translate(17.9997 182) rotate(90) scale(18)"*/}
               {/*      >*/}
               {/*         <stop*/}
               {/*            offset="0.145833"*/}
               {/*            stopColor="#4A6CF7"*/}
               {/*            stopOpacity="0"*/}
               {/*         />*/}
               {/*         <stop*/}
               {/*            offset="1"*/}
               {/*            stopColor="#4A6CF7"*/}
               {/*            stopOpacity="0.08"*/}
               {/*         />*/}
               {/*      </radialGradient>*/}
               {/*      <radialGradient*/}
               {/*         id="paint2_radial_25:217"*/}
               {/*         cx="0"*/}
               {/*         cy="0"*/}
               {/*         r="1"*/}
               {/*         gradientUnits="userSpaceOnUse"*/}
               {/*         gradientTransform="translate(76.9997 288) rotate(90) scale(34)"*/}
               {/*      >*/}
               {/*         <stop*/}
               {/*            offset="0.145833"*/}
               {/*            stopColor="#4A6CF7"*/}
               {/*            stopOpacity="0"*/}
               {/*         />*/}
               {/*         <stop*/}
               {/*            offset="1"*/}
               {/*            stopColor="#4A6CF7"*/}
               {/*            stopOpacity="0.08"*/}
               {/*         />*/}
               {/*      </radialGradient>*/}
               {/*      <linearGradient*/}
               {/*         id="paint3_linear_25:217"*/}
               {/*         x1="226.775"*/}
               {/*         y1="-66.1548"*/}
               {/*         x2="292.157"*/}
               {/*         y2="351.421"*/}
               {/*         gradientUnits="userSpaceOnUse"*/}
               {/*      >*/}
               {/*         <stop stopColor="#4A6CF7" />*/}
               {/*         <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />*/}
               {/*      </linearGradient>*/}
               {/*      <linearGradient*/}
               {/*         id="paint4_linear_25:217"*/}
               {/*         x1="184.521"*/}
               {/*         y1="182.159"*/}
               {/*         x2="184.521"*/}
               {/*         y2="448.882"*/}
               {/*         gradientUnits="userSpaceOnUse"*/}
               {/*      >*/}
               {/*         <stop stopColor="#4A6CF7" />*/}
               {/*         <stop offset="1" stopColor="white" stopOpacity="0" />*/}
               {/*      </linearGradient>*/}
               {/*      <linearGradient*/}
               {/*         id="paint5_linear_25:217"*/}
               {/*         x1="356"*/}
               {/*         y1="110"*/}
               {/*         x2="356"*/}
               {/*         y2="470"*/}
               {/*         gradientUnits="userSpaceOnUse"*/}
               {/*      >*/}
               {/*         <stop stopColor="#4A6CF7" />*/}
               {/*         <stop offset="1" stopColor="white" stopOpacity="0" />*/}
               {/*      </linearGradient>*/}
               {/*      <linearGradient*/}
               {/*         id="paint6_linear_25:217"*/}
               {/*         x1="118.524"*/}
               {/*         y1="29.2497"*/}
               {/*         x2="166.965"*/}
               {/*         y2="338.63"*/}
               {/*         gradientUnits="userSpaceOnUse"*/}
               {/*      >*/}
               {/*         <stop stopColor="#4A6CF7" />*/}
               {/*         <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />*/}
               {/*      </linearGradient>*/}
               {/*   </defs>*/}
               {/*</svg>*/}
            </div>
            <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
               <svg
                  width="364"
                  height="201"
                  viewBox="0 0 364 201"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
                     stroke="url(#paint0_linear_25:218)"
                  />
                  <path
                     d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
                     stroke="url(#paint1_linear_25:218)"
                  />
                  <path
                     d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
                     stroke="url(#paint2_linear_25:218)"
                  />
                  <path
                     d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
                     stroke="url(#paint3_linear_25:218)"
                  />
                  <circle
                     opacity="0.8"
                     cx="214.505"
                     cy="60.5054"
                     r="49.7205"
                     transform="rotate(-13.421 214.505 60.5054)"
                     stroke="url(#paint4_linear_25:218)"
                  />
                  <circle
                     cx="220"
                     cy="63"
                     r="43"
                     fill="url(#paint5_radial_25:218)"
                  />
                  <defs>
                     <linearGradient
                        id="paint0_linear_25:218"
                        x1="184.389"
                        y1="69.2405"
                        x2="184.389"
                        y2="212.24"
                        gradientUnits="userSpaceOnUse"
                     >
                        <stop stopColor="#4A6CF7" stopOpacity="0" />
                        <stop offset="1" stopColor="#4A6CF7" />
                     </linearGradient>
                     <linearGradient
                        id="paint1_linear_25:218"
                        x1="156.389"
                        y1="69.2405"
                        x2="156.389"
                        y2="212.24"
                        gradientUnits="userSpaceOnUse"
                     >
                        <stop stopColor="#4A6CF7" stopOpacity="0" />
                        <stop offset="1" stopColor="#4A6CF7" />
                     </linearGradient>
                     <linearGradient
                        id="paint2_linear_25:218"
                        x1="125.389"
                        y1="69.2405"
                        x2="125.389"
                        y2="212.24"
                        gradientUnits="userSpaceOnUse"
                     >
                        <stop stopColor="#4A6CF7" stopOpacity="0" />
                        <stop offset="1" stopColor="#4A6CF7" />
                     </linearGradient>
                     <linearGradient
                        id="paint3_linear_25:218"
                        x1="93.8507"
                        y1="67.2674"
                        x2="89.9278"
                        y2="210.214"
                        gradientUnits="userSpaceOnUse"
                     >
                        <stop stopColor="#4A6CF7" stopOpacity="0" />
                        <stop offset="1" stopColor="#4A6CF7" />
                     </linearGradient>
                     <linearGradient
                        id="paint4_linear_25:218"
                        x1="214.505"
                        y1="10.2849"
                        x2="212.684"
                        y2="99.5816"
                        gradientUnits="userSpaceOnUse"
                     >
                        <stop stopColor="#4A6CF7" />
                        <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                     </linearGradient>
                     <radialGradient
                        id="paint5_radial_25:218"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(220 63) rotate(90) scale(43)"
                     >
                        <stop
                           offset="0.145833"
                           stopColor="white"
                           stopOpacity="0"
                        />
                        <stop offset="1" stopColor="white" stopOpacity="0.08" />
                     </radialGradient>
                  </defs>
               </svg>
            </div>
         </section>
      </>
   )
}

export default ServicesPage
