'use client';

import React from 'react';
import FaqItem from '@/components/(menu)/FaqItem/faq-item';

const FaqPage = () => {
   const faqItems = [
      {
         question: 'OK, so I take the test and find my RQ. So what?',
         answer:
             "Have you ever asked the same question about your IQ? You’ve wondered about your IQ and maybe had it tested. Why? Because it's about finding out who you are. If you have a high IQ, you’ll hang out with brighter people and think about college and career. It's no different with the RQ. You now can know your RQ and those traits you have or don’t that make up your relationship skill set. This is what EVERYONE wants when they think about their partners or partners-to-be. We all want to be in a relationship with someone who has high relationship skills. It starts with finding out your RQ, your relationship skills and how many of those skills you have.",
      },
      {
         question: 'How exactly was this test conceived?',
         answer:
             'During sessions with couples, there were times when the couples beautifully blended and worked well together. At that exact moment, the psychologist stopped the couple and probed their states of mind until the exact state of mind and the things that created it were clear. The same was done when couples fought. These patterns helped identify traits that made people better or worse in relationships and formed the scales on the test.',
      },
      {
         question: 'How does this benefit me?',
         answer:
             "When we meet someone new, we instantly begin to assess that person’s qualities. What if we could minimize flags that might appear BEFORE starting? What if we could identify and work out incompatibilities early? The RQ test allows you to better understand your relationship strengths and select compatible partners based on deeper, meaningful criteria.",
      },
      {
         question: 'How does the RQ test do this?',
         answer:
             'The overall score is based on your pattern of responses compared to established norms. You receive a total score, percentile, RQ, and classification. The test also provides an in-depth analysis of your strengths and areas of improvement, which can be compared to others for a Compatibility Quotient (CQ).',
      },
      {
         question: 'Are you going to create a dating site?',
         answer:
             'Yes. We plan to create a dating site where users can take the test and compare their results with others in the database. High CQ matches, filtered by preferences and geography, will improve relationship success rates.',
      },
      {
         question: 'Why don’t dating sites use this?',
         answer:
             'Many dating sites rely on superficial qualities in their algorithms. We assess deeper personality traits that have more predictive power for relationship success.',
      },
      {
         question: 'Why don’t businesses use this idea?',
         answer: 'It hasn’t been invented yet. We’re working on it!',
      },
      {
         question: 'Does it matter if I’m gay, bi, or trans?',
         answer:
             'No. These aspects do not determine relationship success. Unless specified, preferences like religion, politics, or lifestyle are not used for matching.',
      },
      {
         question: 'Are there any other restrictions?',
         answer: 'You have to be at least 18 years old. Other than that, there are no restrictions.',
      },
      {
         question: 'What if I’m in a thruple?',
         answer:
             'The algorithm currently supports comparisons for two people. We can analyze individual dynamics between each pair, but not all three people at once.',
      },
      {
         question: 'Is this test limited to potential partners?',
         answer:
             'No. The RQ applies to all types of relationships, including professional ones. We envision its use in improving employee relations and team dynamics.',
      },
      {
         question: 'How do you assess if someone is lying?',
         answer:
             "This feature is proprietary and based on clinical data and psychometrics used in psychology. It's designed to minimize misleading behavior on dating sites.",
      },
   ];

   return (
       <section
           id="faq"
           className="relative mt-8 z-10 bg-wild-blue overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
       >
          <div className="container">
             <div className="flex flex-wrap -mt-32">
                <div className="w-full px-4">
                   <div className="mx-auto max-w-[800px] space-y-8 px-8">
                      {faqItems.map((item, index) => (
                          <FaqItem key={index} question={item.question} answer={item.answer} />
                      ))}
                   </div>
                </div>
             </div>
          </div>
       </section>
   );
};

export default FaqPage;
