'use client'

import React from 'react'
import FaqItem from '@/components/(menu)/FaqItem/FAQItem'

const FaqPage = () => {
   return (
      <>
         <section
            id="faq"
            className="relative z-10 bg-wild-blue overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
         >
            <div className="container">
               <div className="-mx-4 flex flex-wrap -mt-32">
                  <div className="w-full px-4 ">
                     <div
                        className="mx-auto max-w-[800px]"
                     >

                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="OK, so I take the test and find out my RQ. So what?"
                              answer="Have you ever asked the same question about your IQ? You’ve wondered about your IQ and maybe had it tested. Why? Because it's about finding out who you are. If you have a high IQ, you’ll hang out with brighter people and think about college and career. It's no different with the RQ. You now can know your RQ and those traits you have or don’t that make up your relationship skill set. This is what EVERYONE wants when they think about their partners or partners-to-be. We all want to be in a relationship with someone who has high relationship skills. It starts with finding out your RQ, your relationship skills and how many of those skills you have."
                           />
                        </div>

                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="How exactly was this test conceived?"
                              answer=" During sessions with couples, there were times when the couples beautifully blended and worked
               well together. At that exact moment, the psychologist stopped the couple and probed their states
               of mind, until the exact state of mind and the things that created it were clear. The same thing
               was done when couples fought. The pair was stopped, and their “fighting” state of mind was
               examined until all the parts were exposed. This exposed the successful and unsuccessful traits,
               AND their genesis; that is, the history that created them. These histories helped identify the
               traits that made people better or worse in relationships. Nobody assessed this, so we sought out
               a way to do this. This provided the raw data to investigate what traits and abilities actually
               work, as they were excavated “in vivo,” and, conversely, what undermined being a successful
               partner. These traits kept coming up, both positive and negative ones, in couple after couple,
               over years and years. The pattern and the list of traits formed the scales on the test. The rest
               was to just develop a test to measure how much of these traits anyone has, and quantify the
               data."
                           />
                        </div>

                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="How does this benefit me?"
                              answer=" When we meet someone new, we instantly begin to assess that person’s qualities. When this is a
                                     potential dating relationship, we look for “red flags,” which in the beginning, appear as “pink
                                     flags.” What if we could minimize the number of flags that are going to appear BEFORE we start?
                                    What if we could identify them and work them out; meaning, fix the dynamics of incompatibility
                                     when they are little, not later when they blow up? Better yet, what if we could bypass most of
                                     the problems and simply select others who have compatible (higher) RQ’s in the first place? More
                                     importantly, what if we know our own strengths and could build upon them right away; meaning,
                                     use them to build success into relationships, starting with being clear about our own strengths?
                                     We envision users of other dating sites putting their RQ’s on their profile pages, or once
                                     matched with someone, to request they also take the High RQ test and compare their scores to
                                     each other, thus at least looking at the CQ potential BEFORE going on that first date. We think
                                     this will save everyone tons of grief by NOT picking the wrong partners in the first place by
                                     using an instrument that looks at deeper, more meaningful criteria. Imagine if this process was
                                     included in job applications?"
                           />
                        </div>
                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="How does the RQ test do this?"
                              answer="The overall score is based upon your pattern of responses. The norms were derived from hundreds
                        of protocols, so right away we know how you did vis a vis others. We’ll provide you with your
                        standing by total score, percentile (58th percentile, 92nd percentile, etc.), RQ (just like an
                        IQ) and Classification (High Average, Average, etc.). These results give you a very good idea of
                        how and where (exactly) you measure up. Next, we provide an in-depth analysis of your individual
                        scale scores, what they mean, where you will be strong or (?). You can take these scores “to the
                        bank” when meeting others. If they take the same test and we compare their results to yours, you
                        will have your CQ or Compatibility Quotient. In the world of relationships, this is gold."
                           />
                        </div>
                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="Are you going to create a dating site?"
                              answer="Yes. Its a simple jump from creating a CQ for any two people who already know each other, to
                        creating that same CQ for strangers. We plan on creating a dating site so anyone can take the
                        test and have their results compared to everyone else in the databank. High CQ people, depending
                        upon their geographics and other preferences, will then be matched. The process should increase
                        the chance of relationship success over other sites because the RQ measures the skills that
                        really matter."
                           />
                        </div>

                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="Why don’t dating sites use this?"
                              answer=" We’ve looked very carefully at the many dating sites, especially the top ten. Each of them tries
                        to match people based upon their own algorithms. One or two do a better job even though they
                        don’t look at the same in-depth personality and other factors in the same way we do. Most of the
                        sites assess people based on those more superficial qualities that don’t have much predictive
                        power."
                           />
                        </div>

                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="Why don’t businesses use this idea?"
                              answer="It hasn’t been invented yet. We’ll get there"
                           />
                        </div>

                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="Does it matter if I’m gay, bi or trans?"
                              answer=" No. These lifestyles and behaviors are NOT what matters in successful relationships. The same is
                        true of whether you are religious or not, a vegetarian, political or not, etc. Unless you
                        specify what you want in a relationship (Christian, Republican, Vegetarian, for example) we will
                        not use those to match you."
                           />
                        </div>
                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="Are there any other restrictions?"
                              answer="You have to be at least 18 years old. Other than that, there are no restrictions."
                           />
                        </div>
                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="What if I’m in a thruple? (Relationship with two other people)."
                              answer="This one’s not yet in our algorithm. We can compare any two people’s RQ, but not three people
                        all at once. So, if you want a comparison of RQ’s, we would have to do it two people at a time.
                        While this would be very helpful when looking at the dynamics of each dyad, it would provide
                        only limited information about how all three people interact together."
                           />
                        </div>

                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="Is this test limited to just potential partners in relationships?"
                              answer="The RQ applies to every relationship. So far, this site is geared more to personal relationships
                        of the dating kind, but the RQ works to help everyone understand their relationship skill
                        levels, which as we know, applies everywhere to ANY relationship. We envision the RQ test being
                        incorporated into businesses to help with employee relations, especially between the boss and
                        subordinates (the number one complaint of employees)."
                           />
                        </div>
                        <div className="px-8 space-y-8 mb-4">
                           <FaqItem
                              question="How do you assess whether someone is lying? This seems unique to your test."
                              answer="It is unique. This need was spotted in the many comments from users of the current dating sites.
                        The modal complaint is, “You don’t know who you’re going to get.” The second most common
                        complaint is, “One in seven people on dating sites is a scammer.” We intend to cut down on such
                        experiences in our own way, based on clinical data and other psychometrics used for 50 years in
                        psychology. Unfortunately, how we do this is proprietary and confidential. You’ll have to trust
                        us a little on this one, as we don’t want this to get out."
                           />
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
                        {/*         <stop*/}
                        {/*            offset="1"*/}
                        {/*            stopColor="#4A6CF7"*/}
                        {/*            stopOpacity="0"*/}
                        {/*         />*/}
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
                        {/*         <stop*/}
                        {/*            offset="1"*/}
                        {/*            stopColor="#4A6CF7"*/}
                        {/*            stopOpacity="0"*/}
                        {/*         />*/}
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
                        {/*         <stop*/}
                        {/*            offset="1"*/}
                        {/*            stopColor="white"*/}
                        {/*            stopOpacity="0"*/}
                        {/*         />*/}
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
                        {/*         <stop*/}
                        {/*            offset="1"*/}
                        {/*            stopColor="white"*/}
                        {/*            stopOpacity="0"*/}
                        {/*         />*/}
                        {/*      </linearGradient>*/}
                        {/*      <linearGradient*/}
                        {/*         id="paint6_linear_25:217"*/}
                        {/*         x1="118.524"*/}
                        {/*         y1="201.59"*/}
                        {/*         x2="166.965"*/}
                        {/*         y2="438.547"*/}
                        {/*         gradientUnits="userSpaceOnUse"*/}
                        {/*      >*/}
                        {/*         <stop stopColor="#4A6CF7" />*/}
                        {/*         <stop*/}
                        {/*            offset="1"*/}
                        {/*            stopColor="#4A6CF7"*/}
                        {/*            stopOpacity="0"*/}
                        {/*         />*/}
                        {/*      </linearGradient>*/}
                        {/*   </defs>*/}
                        {/*</svg>*/}
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

export default FaqPage
