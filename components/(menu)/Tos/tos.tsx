// 'use client'
//
// import React from 'react'
// import FaqItem from '@/components/(menu)/FaqItem/faq-item'
//
// const TosPage = () => {
//     return (
//         <>
//             <section
//                 id="tos"
//                 className="relative z-10 bg-hrqColors-skyBlue-800 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
//             >
//                 <div className="container">
//                     <div className="-mx-4 flex flex-wrap -mt-32">
//                         <div className="w-full px-4 ">
//                             <div className="mx-auto max-w-[800px]">
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Terms of User Agreement"
//                                         answer="Please read this terms of use agreement carefully. This is a legal agreement (“Agreement”) between you and HighRQ, Inc., an LLC corporation (“HighRQ”).
//
//                     BY ACCESSING OR USING HIGHRQ’S SITES AND HIGHRQ’S SERVICE(S), YOU AGREE TO BE BOUND BY THESE TERMS AND ALL TERMS INCORPORATED BY REFERENCE. IF YOU DO NOT AGREE TO ALL OF THESE TERMS, DO NOT ACCESS OR USE HIGHRQ’S SITES OR HIGHRQ’S SERVICE(S).
//
//                     THIS AGREEMENT CONTAINS A MANDATORY ARBITRATION OF DISPUTES PROVISION THAT REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS.
//
//                     By accessing the HighRQ website, currently located at www.HighRQ.com, and using any of the service(s) accessible through the site, you become a member and agree to, and are bound by the terms and conditions of this agreement for as long as you continue to use the site or service(s)."
//                                     />
//                                 </div>
//
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Service(s)"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `Level 1) Creation of an RQ (Relationship Quotient) score, generated from HighRQ’s questionnaire. <br/><br/>Answers will be scored and a written report will be sent only to you, which will include HighRQ’s proprietary RQ evaluation and score, and a description of the qualities that contribute to HighRQ’s score. All members have to participate in Level 1 and take the RQ questionnaire.
//
//                     In the near future, there will be two additional levels of service(s)<br/><br/>
//
//                     Level 2) Creation of a CQ (Compatibility Quotient) score, generated from yours and a mutually agreed upon partner’s answers to the HighRQ Questionnaire. This level of service is designed to measure compatibility between people already in a relationship, or between people who wish to compare their scores individually when they both at least know each other. When both parties agree to compare their RQ scores to each other, a written report will be sent separately to both of you, which will include the RQ scores for both. The CQ is derived from the pattern of scoring that generates each individual RQ score and the relationship(s) of the many scales between each partner. The CQ report will explain the key areas where you match, or not, and will yield a numeric score and explanation. Additional materials will be sent to increase compatibility, if desired. Level 2 service(s) are not offered at the present time and are optional.<br/><br/>
//
//                     Level 3) Creation of matching information for you and another on the dating service(s), based on your RQ and another’s score on the HighRQ Questionnaire (plus additional demographic information provided by you and others for additional matching criteria). This level of service is designed to match people who do not know each other; in other words, to create a CQ for people who wish to meet others on a dating site. The written report may be requested, or the two recipients may only want their individual RQ’s and self-select other participants on the dating site. If desired, the optional written report will describe expected compatibilities (CQ) and material can be available to boost the CQ. Level 3 service(s) are currently not available and are optional.<br/><br/
//
//                     This Agreement will apply to all aspects of the service(s) described above. The following terms and their definitions will be used throughout this agreement.`,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Definitions"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `“Apps” refers, individually and collectively, to each and all of the Mobile Apps, Desktop Apps, and HighRQ Apps.<br/><br/>
//
// “Desktop Apps” means the desktop applications published by HighRQ, which may be offered from time to time.<br/><br/>
//
// “Mobile Apps” means the iOS application and the Android application or any other mobile/tablet device software applications published by HighRQ, which may be offered from time to time.<br/><br/>
//
// “Member” means any person who has opened an account, paid the fee and been accepted by HighRQ and whose membership remains valid, regardless of level of service(s) purchased.<br/><br/>
//
// “Membership” means you are entitled to one or more service(s) by virtue of being a member. Such entitlement of service(s) varies depending on the level of service(s) purchased.<br/><br/>
//
// “Service(s)” means any and all of the service(s) provided by HighRQ by any means, including, but not limited to, The HighRQ questionnaire, RQ or CQ reports, dating service(s), information on the HighRQ websites, Apps, or any software provided by HighRQ on any device.<br/><br/>
//
// “Visitor” means any person who browses the service(s) but who has not matriculated into being a Member.
//
// “HighRQ website(s)” means, individually or collectively, any HighRQ website operated by HighRQ, Inc.`,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Membership and Subscription"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `By accessing or using the service(s), you represent and warrant that, you are at least 18 years old, have the legal capacity, right and authority to enter into a contract in the jurisdiction where you reside.   You further stipulate that you have never been convicted of a felony or any criminal offense characterized as a sexual offense and are not required to register as a sex offender with any government entity.  HighRQ does not routinely conduct criminal background screenings on its members.   However, HighRQ reserves the right to conduct any criminal background check, at any time and using available public records, to confirm your compliance with this agreement.  By agreeing to these terms and conditions, you hereby authorize any such check.<br/><br/>You also stipulate that you have not previously been suspended or removed from the Service(s) and that you will abide by all of the terms and conditions of this Agreement.   HighRQ will not matriculate you if you have previously been banned from using HighRQ’s service(s) or similar service(s).<br/><br/>
// You stipulate that you are not a competitor of HighRQ and are not using the service(s) for reasons that are in competition with HighRQ for other than its intended purpose.   You stipulate that you are not located in, under the control of, or a national or resident of any country that the United States has embargoed, identified as a “Specially Designated National” or placed on the Commerce Department’s Table of Deny Orders.  You are responsible for determining whether you, the user of the service(s), are legal in HighRQ’s jurisdiction.<br/><br/>
// HighRQ service(s) are available to anyone who meets the above criteria, in any country, at any time.   You understand that users of HighRQ may be from other countries and may have different expectations and cultural training regarding the results of the HighRQ questionnaire.  At the current time, HighRQ provides the RQ, and in the future will provide the CQ, dating matching algorithms, educational and general information materials in English.   Where HighRQ has provided a translation of the English version of this agreement, you agree that the translation is provided for HighRQ’s convenience only and that the English language version of this agreement will govern HighRQ’s relationship with you.  If there is any contradiction between what the English language version of this agreement says and what a translation says, then the English language version will take precedence.<br/><br/>
// To access HighRQ, you must become a member by setting up an account.  You will create only one unique profile for use of the service(s). You will not include any telephone numbers, street addresses, URLs, multimedia, artworks downloaded from external sources, email addresses or any other contact information (especially your real first and last name) in HighRQ’s demographic profile or in any other publicly viewable user content, profile or other communication forums that might interface with HighRQ’s service(s).
// <br/><br/>Visitors (non-subscribers) are not members and have no rights or privileges.  Absent special offers, you acknowledge and agree that if you are not a member, you will not be able to use the features available within the service(s).   As a non-member others will not be able to see HighRQ’s profile or communicate with you.   A member’s profile may remain on the HighRQ website even if that member is not actively using the service(s). You acknowledge that although a member’s profile may be viewed by HighRQ, you may not (even as a member) be able to use the service(s) to communicate with that member if he or she is not a paid member.
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Acceptance of Terms and Use Agreement"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `You are granted a limited, non-sublicensable license to access and use the service(s), subject to the terms and conditions of this agreement.   This license is revocable at any time.   Except for HighRQ’s user content, defined as information and data posted by users on or through the service(s), the service(s) and all materials therein or transferred thereby, including, without limitation, software, images, text, graphics, designs, illustrations, HighRQ’s logos, patents, trademarks, service(s) marks, copyrights, photographs, audio, videos, music, information, data, other files and the arrangement thereof and user content belonging to other users, and all intellectual property rights related thereto, are the exclusive property of HighRQ.   Except as explicitly provided herein, nothing in this Agreement shall be deemed to create a license in or under any such intellectual property rights of HighRQ.
//
// <br/><br/>This Agreement is an electronic contract.  No paper version of this agreement will be made available.   (HighRQ allows you to print any or all of this agreement for your own personal use.)   HighRQ may provide you with notices, including those regarding changes to this agreement.
//
// <br/><br/>Because the service(s) are provided electronically, you must consent to HighRQ providing important information electronically if you wish to use the service(s).  You consent to being provided with this agreement, notices, disclosures, information, policies and other materials in electronic form rather than in paper form in accordance with The Electronic Signatures in Global and National Commerce Act.  This consent applies to sending and receiving all electronic records, notices, disclosures, documents, records or other materials of any kind that HighRQ may be required to provide to you.
//
// <br/><br/>Such notices may not be received if you violate this agreement by accessing the service(s) in an unauthorized manner or if your paid subscription lapses. You agree that you are deemed to have received any and all notices that would have been delivered had you accessed the service(s) in an authorized manner.
// <br/><br/>Electronic records will be provided on HighRQ’s sites and service(s) or sent to the email address associated with your HighRQ account.  In order for you to access and retain electronic records sent by HighRQ, you must have the following hardware and software: a computer or other access device capable of reading html and text files, a modem or other means of accessing the Internet, a browser capable of accessing and displaying the HighRQ website and the ability to receive and read emails, which you agree to keep current and accurate. The service(s) provided by HighRQ are only available if you agree to receive electronic records and you understand that withdrawing such consent will result in your HighRQ account being deactivated.   To withdraw this consent, you must cease using the service(s) and terminate your HighRQ account electronically.
// <br/><br/>The agreement applies to HighRQ’s use of all features, widgets, plug-ins, applications, content, downloads and/or other service(s).
//
// <br/><br/>You acknowledge and agree that members may be part of an online community that includes other websites owned by HighRQ or its affiliates. Therefore, profiles on the HighRQ website may be viewable on other related HighRQ websites and paying members of one HighRQ website may be able to communicate with other paying members on all HighRQ websites.
//
// <br/><br/>You agree to purchase the right to take the HighRQ Questionnaire and to pay the one-time fee before getting the results.   For this fee, you will receive HighRQ’s RQ Report (Level 1 service).   For an additional fee in the future, and if applicable, you agree to receive HighRQ’s CQ report (Level 2 service(s)).  Separate fees are applicable for matriculation into the dating service(s) (Level 3 service), which like Level 2 service(s) are also unavailable at the current time.   All members agree to purchase at least Level 1 service(s).   Even when available, additional service(s) are optionable.
//
// <br/><br/>This is a non-refundable service.   All sales are final for the one-time fee for Level 1 and will be non-refundable for Level 2 service(s).  No recurring charges will be applied for Level 1 or Level 2 service(s).   Additional fees, which are recurring, will apply if you elect to participate in Level 3 service(s), e.g., the dating site (see terms below) when Level 3 service(s) become available.
// <br/><br/>This agreement and any policy or guideline of the service(s) may be modified by HighRQ in its sole discretion at any time.  HighRQ shall provide notice of any such modification.   Said notice shall, at a minimum, consist of posting the revised agreement to the sites. When HighRQ changes the agreement, HighRQ will update the “last revised” date on the site.  If you are a non-member at the time of any modification, unless otherwise indicated, any changes or modifications will be effective immediately upon posting the revisions to the site or service(s), and HighRQ’s use of the service(s) after such posting will constitute acceptance by you of the revised agreement.  If you are a member at the time of any change or modification, unless otherwise indicated this agreement will continue to govern HighRQ’s membership until such time that HighRQ’s membership renews. If you continue with HighRQ, the renewal will constitute acceptance by you of the revised agreement. Alternatively, if you terminate with HighRQ, at such time, HighRQ’s use of the service(s) after HighRQ’s termination will constitute acceptance by you of the revised agreement. As a result, you should frequently review this agreement and all applicable terms and policies to understand the terms that apply to HighRQ’s use of the service(s). If you do not agree to the amended terms, you must stop using the service(s).
// <br/><br/>HighRQ may update and amend these terms & conditions at any time and HighRQ will make the updated terms & conditions available through the service(s). You understand and agree that you will be deemed to have accepted the updated terms & conditions if you use the service(s) after the updated terms & conditions are made available to you. If at any point you do not agree to any part of the terms & conditions in operation, you should immediately stop using the service(s).
// <br/><br/>You acknowledge and agree that HighRQ may make changes to, or stop providing, the Apps, the HighRQ websites and/or the service(s), or restrict HighRQ’s use of the Apps, the HighRQ websites and/or the service(s), at any time without notifying you in advance.  You acknowledge and agree that HighRQ can disable or deny you access to the Apps, the HighRQ websites and/or the service(s), without notifying you in advance, for any reason or no reason including, without limitation, for any violation of these terms & conditions and/or if HighRQ suspects that you have used any aspect of the service(s) to conduct any fraudulent or illegal activity. If HighRQ disables access to HighRQ’s account, you may be prevented from accessing the service(s), account details or any materials contained in HighRQ’s account.
// <br/><br/>You are solely responsible for the content and information that you provide, publish, transmit, display or otherwise communicate to HighRQ through the service(s) or to other users, including without limitation messages, data, text, video, music, graphics, links or other materials posted through chat messages, community pages, email messages, mobile messages, photos and profile information.   You will not post any inaccurate, misleading, incomplete or false information to HighRQ or to any other user.  When available, you may be required to supply certain information and post a photo of yourself (Level 3 only) to use the service(s).   You agree that all images posted to HighRQ’s profile are of you and have been taken within the last 2 years.   You agree to update HighRQ’s dating profile accordingly.
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Code of Conduct"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `As a user, you are solely responsible for the content and information that you post, upload, publish, link to, transmit, record, display or otherwise make available on the service(s) or transmit to other members, including emails, videos (including streaming videos), photographs, voice notes, recordings or profile text, whether publicly posted or privately transmitted.  You represent and warrant that all information that you submit upon registration is accurate and truthful and that you will promptly update any information provided by you that subsequently becomes inaccurate, misleading or false.
//
// <br/><br/>HighRQ claims no ownership or control over HighRQ’s user content, except as otherwise specifically provided herein on the website or by separate agreement, in writing with HighRQ.  By submitting or posting user content, you automatically grant, and you represent and warrant that you have the right to grant, to HighRQ, its affiliates, licensees and successors an irrevocable, perpetual, non-exclusive, fully paid, worldwide right and license to use, copy, publicly perform, publicly display, reproduce, adapt, modify and distribute such user content furnished by you and to prepare derivative works of, or incorporate into other works, such information and to grant and authorize sublicenses of the foregoing in any medium, on any device.  You represent and warrant that the user content and the public posting and use of HighRQ’s user content by HighRQ will not infringe or violate any third-party rights, including without limitation any intellectual property rights or rights of privacy or publicity, or cause any harm to any third party or violate the terms of this agreement. You further represent and warrant that you have the written consent of each and every identifiable natural person in HighRQ’s user content to use such person’s name or likeness in the manner contemplated by the service(s) and this agreement, and each such person has released you from any liability that may arise in relation to such use. By posting user content, you hereby release HighRQ and its agents and employees from any claims that such use, as authorized above, violates any of HighRQ’s rights and you understand that you will not be entitled to any compensation for any use of HighRQ’s user content.
// <br/><br/>HighRQ is not responsible for the conduct of any member.  You agree to take all necessary precautions in all interactions with other members, particularly if you decide to communicate through the HighRQ website or meet in person, or if you decide to send money to another member.  You should not provide financial information, for example, credit card or bank account information, or wire or otherwise send money to other members.   In addition, you agree to review and follow HighRQ’s Dating Safety Tips.   In the future, these will be located  on the HighRQ website and currently are located at the end of this agreement.
// <br/><br/>You will not post any material on HighRQ that promotes racism, discrimination, bigotry, hatred or physical harm of any kind against any group or individual based upon color, ethnicity, national origin, sexual orientation, religion, gender identity, family situation, pregnancy, physical appearance, surname, state of health, disability, genetic characteristics, personal beliefs, political opinions or union activities.   Further, you will not post any material on HighRQ that is vulgar, offensive, inaccurate, obscene, profane, threatening, rude, derogatory, defamatory, pornographic, and violent in nature, misogynistic or insulting.
// <br/><br/>You will not exploit people in a sexual, violent or other illegal manner, or solicit personal information from anyone under the age of 18.   You will not harass, stalk or intimidate another person, including HighRQ staff.  You will not solicit money from anyone on HighRQ or defraud other users.   You will not engage in gambling or any similar activity or any illegal or unlawful activity.  You will not promulgate information that is false or misleading, or that promotes any other illegal activities or conduct that is defamatory, libelous or otherwise objectionable.    You will not solicit or engage in prostitution.   You will not attempt to sell or buy any legal or illegal substances.   You will not send or receive material on the HighRQ website that transmits junk mail, chain letters or unsolicited mass mailings.
// <br/><br/>You will not engage in spamming, spamming, phishing, trolling or similar activities.   You will not post illegal or unauthorized copies of another person’s copyrighted work, such as computer programs or links to them, or information about copy-protected devices.   You will not post pirated images, audio or video, or links to pirated images, audio or video files.   You will not post video, audio photographs, or images of another person without his or her permission.   You will not post restricted or password only access pages, or hidden pages or images (those not linked to or from another accessible page), or passwords or user names, telephone numbers or other access information in any form at any time.   You will not provide instructional information about products, legal or illegal.   You will not upload viruses, time bombs, trojan horses, cancelbots, worms or any disruptive codes, components or devices that interfere with or disrupt the service(s) of the HighRQ website or the servers or networks connected to the service(s) of the HighRQ website.   You will not upload material that impersonates a person or business entity acting as an individual, or otherwise misrepresents affiliation, connection or association with, any person or entity, including corporations or businesses.   You will not forge headers or otherwise manipulate (re-direct) identifiers in order to disguise the origin of any information transmitted to or through the HighRQ website or service(s) (either directly or indirectly through use of third party software).   You will not frame or mirror any part of the service(s) on the HighRQ website, without HighRQ’s prior written authorization.   You will not upload material to elicit any commercial endeavors such as advertising, soliciting for social functions or networking.   You will not upload meta tags or code or other devices containing any reference to HighRQ, the HighRQ website or the service(s).   You will not modify, adapt, sublicense, translate, sell, reverse engineer, decipher, decompile or otherwise disassemble any portion of the service(s) or the HighRQ website or any software used on or for the service(s) of the HighRQ website, or cause others to do so
// <br/><br/>You will not express or imply that any statements you make are endorsed by HighRQ without HighRQ’s specific prior written consent.   You will not ask or use members to conceal the identity or destination of any illegally gained money or products.   You will not post, transmit or deliver to any other user, either directly or indirectly, any user content that violates any third-party rights.
//
// <br/><br/>You will only use the service(s) for HighRQ’s sole, personal use and not in connection with any commercial endeavors. You will not authorize others to use the service(s) or otherwise attempt to transfer HighRQ’s right to use the service(s) to any other person or entity.
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Limitations on Liability"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `
// HighRQ does not control, take responsibility for or assume liability for any user content posted by any third party, or for any loss or damage thereto, nor is HighRQ liable for any mistakes, defamation, slander, libel, omissions, falsehoods, obscenity, pornography or profanity you encounter.  You are solely responsible for your use of the service(s) and use them at your own risk.   All information presented in this section applies to both the website and to any and all experiences related to the use of any and all mobile devices or any other social media used to access HighRQ.
//
// <br/><br/>You are solely responsible for, and assume all liability regarding, the information and content you contribute to the service(s), the information and content you post, transmit, publish, or otherwise make available through the service(s), and HighRQ’s interactions with other registered users through the service(s).   HighRQ and its contractors may use various ways of verifying information that users have provided.   You agree that HighRQ and its contractors will have no liability to you arising from any incorrectly verified information.
// <br/><br/>Any advice, report or relationship information that may be posted on the HighRQ website or provided to you through the service(s) is for informational and ENTERTAINMENT purposes only.   It is not intended to replace or substitute for any professional financial, medical, psychological, legal or other advice or service(s).  You understand that HighRQ makes no guarantees, either expressed or implied, regarding the accuracy of the information provided or about HighRQ’s compatibility information with respect to already established partners or people you have not yet met, as in Level 2 or Level 3 (when they become available), respectively, dating information or with any individuals you meet through the service(s).   HighRQ makes no representations or warranties and expressly disclaims any and all liability concerning any treatment, action by, or effect on any person related to and following the information offered or provided within or through the HighRQ website or service(s).
// <br/><br/>If you have specific concerns or a situation arises in which you require advice, you should consult with an appropriately trained, licensed and qualified practitioner and/or specialist.   HighRQ is not responsible for any costs of such service(s), which shall be sought solely upon your discretion, not related to any information provided by HighRQ.  In no event shall HighRQ, its affiliates or its partners be liable (directly or indirectly) for any losses or damages whatsoever, whether direct, indirect, general, special, compensatory, consequential, and/or incidental, arising out of any information provided by HighRQ, or relating to the conduct of you or anyone else in connection with the use of the HighRQ website or service(s) including, without limitation, death, bodily injury, emotional distress, financial damage and/or any other costs or damages resulting from communications or meetings with other members or persons you meet through the service(s).
// <br/><br/>Further, to the fullest extent allowed by applicable law, in no event will HighRQ, its affiliates, business partners, licensors or service(s) providers be liable to you or any third person or business for any reliance, consequential, exemplary, incidental, special or punitive damages, including without limitation, damages for loss or corruption of data or programs, service(s) interruptions and procurement of substitute service(s), even if HighRQ has been advised of the possibility of such damages.   Notwithstanding anything to the contrary contained herein, HighRQ’s liability to you for any cause whatsoever, and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to HighRQ for the service(s) during the term of the membership.   You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the HighRQ website or service(s) or the terms of this agreement must be filed within 45 days, after which time, the claim or cause of action will be forever banned and considered void.
// <br/><br/>Neither HighRQ nor its affiliates and third party partners are responsible for and shall not have any liability, directly or indirectly, for any loss or damage, including personal injury or death, as a result of or alleged to be the result of any incorrect or inaccurate content posted on the HighRQ website or provided in connection with the service(s)
// <br/><br/>Neither HighRQ nor its affiliates and third party partners are responsible for and shall not have any liability, directly or indirectly, for any loss or damage,  whether caused by members or any of the equipment or programming associated with or utilized in the HighRQ website or service(s), the timeliness, deletion or removal, incorrect delivery or failure to store any content, communications or personalization settings, the conduct, whether online or offline, of any member, any error, omission or defect in, interruption, deletion, alteration, delay in operation or transmission, theft or destruction of, or unauthorized access to, any user or member communications.
// <br/><br/>Neither HighRQ nor its affiliates and third party partners are responsible for and shall not have any liability, directly or indirectly, for any loss or damage for any problems, failure or technical malfunction of any telephone network or lines, computer online systems, servers or providers, computer equipment, software, failure of email or players on account of technical problems or traffic congestion on the Internet or at any HighRQ website or combination thereof.
// <br/><br/>Neither HighRQ nor its affiliates and third party partners are responsible for and shall not have any liability, directly or indirectly, for any loss or damage, including injury or damage to members or to any other person’s computer related to or resulting from participating or downloading materials in connection with the Internet and/or in connection with the service(s).
// <br/><br/>To the maximum extent allowed by applicable law, HighRQ provides the HighRQ website and the service(s) on an “AS IS” and “AS AVAILABLE” basis.   HighRQ grants no warranties of any kind, whether expressed, implied, statutory or otherwise with respect to the service(s) or the HighRQ website.
//
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Payment"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `HighRQ may, from time to time, offer various payment methods, including without limitation payment by credit card, by debit card, by check, by certain mobile payment providers or by using PayPal. You authorize HighRQ to charge you for paid service(s) through any payment method(s) you select when purchasing the paid service(s) and you agree to make payment using such payment method(s). HighRQ may, from time to time, receive and use updated payment method information provided by you or that financial institutions or payment processors may provide to us to update information related to HighRQ’s payment method(s), such as updated expiration dates or account numbers.  Certain payment methods, such as credit cards and debit cards, may involve agreements or fees between you and the financial institution, credit card issuer or other provider of HighRQ’s chosen payment methods. If HighRQ does not receive payment from HighRQ’s payment method Provider, you agree to directly pay all amounts due upon demand from us.  HighRQ’s non-termination or continued use of the paid service(s) reaffirms that HighRQ is authorized to charge HighRQ’s payment method.  HighRQ’s paid service(s) may also be purchased through HighRQ’s accounts with certain third parties, such as HighRQ’s Apple iTunes account, HighRQ’s Google Play account or HighRQ’s Amazon account (a “third party account”). If you purchase any paid service(s) through a third party account, billing for these paid service(s) will appear through HighRQ’s third party account. You should review the third party account’s terms and conditions, which HighRQ does not control.
//
// <br/><br/>For Level 3 service(s) (when it becomes available), if you pay for a subscription by credit or debit card (or other payment method identified on HighRQ’s service(s) or a social networking site as involving an automatically renewing subscription) and you do not cancel HighRQ’s subscription prior to the end of the subscription term, HighRQ’s subscription will be automatically extended at the end of each term of successive renewal periods of the same duration as the subscription term originally selected.   (For example, unless you cancel, a one month subscription will automatically renew on a monthly basis and a six month subscription will automatically renew on a six month basis.)   Unless otherwise indicated in any applicable additional terms or communications HighRQ sends to registered users, such renewal will be at the same subscription fee as when you first subscribed, plus any applicable taxes, unless HighRQ notifies you at least 10 days prior to the end of the HighRQ’s current term that the subscription fee will increase.   You acknowledge and agree that HighRQ’s payment method will be automatically charged for such subscription fees, plus any applicable taxes, upon each such automatic renewal.   You acknowledge that HighRQ’;s subscription is subject to automatic renewals and you consent to and accept responsibility for all recurring charges to HighRQ’s credit or debit card (or other payment method, as applicable) based on this automatic renewal feature without further authorization from you and without further notice except as required by law.   You further acknowledge that the amount of the recurring charge may change if the applicable tax rates change or if you are notified that there will be an increase in the applicable subscription rates.
//
// <br/><br/>In the event that you submit to us a payment that does not cover the price for the paid service(s) you selected, HighRQ shall have the right, in its sole and absolute discretion, to return or refund all or some of the amount of HighRQ’s payment and consequently to alter the level of matriculation you selected (Level 1, Level 2 or Level 3).
// <br/><br/>HighRQ reserves the right to correct any errors or mistakes that it makes.
// <br/><br/>You are entitled to prove that the account balance is not in fact outstanding, or that the account balance is less than alleged.
//
// <br/><br/>The price and payment procedures are permanently accessible on the HighRQ websites.
//
// <br/><br/>All prices stated include all relevant local taxes.
//
// <br/><br/>From time to time, HighRQ may offer free trials or other promotions.  For example, HighRQ may offer promotions that provide free subscriber-level access to the service(s) for a certain period of time at a different price.  HighRQ may provide you with HighRQ’s virtual currency.  Any such virtual currency is subject to the terms of HighRQ separately described at the time of the offering.   Additional Terms applicable to any promotions may be provided.
//
//
// <br/><br/>HighRQ reserve the right to change the cost of any of HighRQ’s service(s).  If you are not happy with the cost of any service(s), you may cancel HighRQ’s membership.
//
// <br/><br/>If you do not pay any amount due pursuant to these Terms & Conditions,
//
// <br/><br/>HighRQ reserves the right to suspend access to the HighRQ website and service(s) until such time as the outstanding payment is received.   Or, HighRQ may elect to terminate the contract without prior notice. The contract period shall remain unaffected by the temporary closure.
//
// <br/><br/>HighRQ may, in accordance with applicable law, forward any debt in arrears for a reasonable period to an external collection agency for recovery.  Debt recovery fees will be charged by the external collection agency on the overdue account balance.   HighRQ does not control these fees and is not responsible nor shall have any liability for the inclusion of said fees.  In accordance with applicable law, you may be charged up to an additional 60% of the overdue account balance as an expense for debt recovery.
//
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Cancellation"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `Except as otherwise stated in this section, you may cancel HighRQ’s registration at any time prior to submitting payment.   Once submitted, subscription to Level 1 and, when available Level 2 service(s) are one-time fees that are non-refundable.    Level 3 service(s), when available, are payable on a renewing basis and will automatically be re-assessed at the end of the subscription term for which you have paid, and you will not receive any refund for any unused days of such subscription term.   Payment in full at the time of matriculation is expected.   No installment plans are offered.
//
// <br/><br/>If you cancel the Level 3 subscription, you, the buyer, agree to notify HighRQ.   You may cancel the agreement, without any penalty or obligation, at any time prior to midnight of the third business day following the date of this agreement, excluding Saturdays, Sundays and holidays. To cancel this agreement, you can send an email to admin@HighRQ.com, which should be electronically signed and dated.   Enter “cancellation” in the subject line.  Said email, in the text or body, should state that you, the buyer, are cancelling this agreement, or words of similar effect.  This emailed notice shall be sent to HighRQ, Inc., Attn: Admin Dept. Please include the e-mail address associated with HighRQ’s account in this notice.  For service(s), the day that you submit a completed subscription form will be the date of this agreement.  Any refunds under this 3-day cancellation policy will be made within 10 days after HighRQ’s receipt of a cancellation notice.
//
// <br/><br/>If you are a paying member and did not cancel HighRQ’s renewable paid membership, you may apply for cancellation at least 24 hours before the date of renewal of the subscription.  If you cancel HighRQ’s paid membership less than 24 hours before the expiration of the term of HighRQ’s paid membership, HIGHRQ’S paid membership will automatically renew in accordance with the above terms and conditions.
//
// <br/><br/>The cancellation of HighRQ’s paid membership will be effective upon the expiration of the relevant paid period and you will have full use of HighRQ’s service(s) until that time.  No refund will be given for unused parts of the contracted period prior to termination.
//
// <br/><br/>If HighRQ cancels a membership for a member’s breach of these terms & conditions, the member shall not be entitled to a refund for the period remaining to elapse until the expiration of the account.
//
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Mobile Service(s)"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `You may access and use certain features of the service(s) using certain mobile devices, including through HighRQ’s SMS service(s) (the “mobile service(s)”). HighRQ’s access and use of the mobile service(s) is subject to the terms and conditions of this agreement, including without limitation the terms and conditions regarding the use and submission of user content, and additional terms presented to you for HighRQ’s acceptance when you sign up to use HighRQ’s mobile service(s).
//
// <br/><br/>Please note that by accessing or using the mobile service(s), HighRQ’s carrier’s normal rates and fees, such as standard message and data rates, still apply and you are solely responsible for the payment of those fees.  To stop receiving SMS messages from us, text STOP to: (to be arranged). To get help, text HELP to: (to be arranged) for instructions. For customer support, please contact us at:  http://www.highrq.com/contactinfo.php or write to admin@HighRQ.com.
//
// <br/><br/>In the event you change or deactivate HighRQ’s mobile telephone number, you agree to update HighRQ’s account information on HighRQ within 48 hours to ensure that HighRQ’s messages are not sent to the person who acquires HighRQ’s old number.
//
// <br/><br/>By using any downloadable application to enable HighRQ’s use of the service(s), you are expressly confirming HighRQ’s acceptance of the terms and conditions of any end user license agreement, or similar agreement, associated with the application provided at download or installation, or as may be updated from time to time.
//
// <br/><br/>HighRQ may make available software to access the service(s) via a mobile or tablet device (“mobile software”).  Mobile software also includes any updates, upgrades or other new features, functionality, improvements or enhancements to the mobile software and any on-line, read me, help files, or other related explanatory materials relating to the mobile software.  To use the mobile software, you must have a device that is compatible with the mobile software. HighRQ does not warrant that the mobile software will be compatible with HighRQ’s device.  HighRQ hereby grants you a non-exclusive, non-transferable, revocable license to use a compiled code copy of the mobile software for one HighRQ account on one device owned or leased solely by you, for HighRQ’s personal use only. You may not modify, disassemble, decompile or reverse engineer the mobile software, except to the extent that such restriction is expressly prohibited by law.   You may not rent, lease, loan, resell, sublicense, distribute or otherwise transfer the mobile software to any third party or use the mobile software to provide time sharing or similar service(s) for any third party.   You may not make any copies of the mobile software.   You may not remove, circumvent, disable damage or otherwise interfere with security-related features of the mobile software, or alter the features that prevent or restrict use or copying of any content accessible through the mobile software, or alter the features that enforce limitations on use of the mobile software.   You may not delete the copyright and other proprietary rights notices on the mobile software, nor block, disable or otherwise affect any advertising, advertisement banner window, links to other sites and service(s) or other features that constitute an integral part of the Mobile Software.   You may not use the mobile software on any device that you do not own or control, nor can you distribute or make the mobile software available over a network where it could be used by multiple devices at the same time.  You agree to use HighRQ’s best efforts to prevent and protect the contents of the mobile software from unauthorized use or disclosure.
//
// <br/><br/>You acknowledge that HighRQ may from time to time issue upgraded versions of the mobile software, and may automatically electronically upgrade the version of the mobile software that you are using on HighRQ’s device. You consent to such automatic upgrading on HighRQ’s device, and agree that the terms and conditions of this agreement will apply to all such upgrades. Any third-party code that may be incorporated in the mobile software is covered by the applicable open source code or third-party end user license agreement, if any, authorizing use of such code. The foregoing license grant is not a sale of the mobile software or any copy thereof, and HighRQ or its third party partners or suppliers retain all rights, title, and interest in the mobile software, and any copy thereof. Any attempt by you to transfer any of the rights, duties or obligations hereunder, except as expressly provided for in this agreement, is void.   HighRQ reserves all rights not expressly granted under this agreement. Additional terms may be contained in an end user license agreement associated with any mobile software.
//
// <br/><br/>If you use a mobile device to access HighRQ’s site or download any of HighRQ’s applications, HighRQ may collect device information (such as HighRQ’s mobile device ID, model and manufacturer), operating system and version information, and IP address.  HighRQ does not ask you for, access or track any location-based information from HighRQ’s mobile device at any time while downloading or using HighRQ’s Mobile Apps or service(s).  HighRQ will send you push notifications if you choose to receive them for notifying you about HighRQ’s singles service(s), when it becomes available, letting you know when someone has sent you a message, or for other service(s)-related matters. If you wish to opt-out from receiving these types of communications you may turn them off at the device level.
//
// <br/><br/>HighRQ may periodically conduct voluntary member surveys.  HighRQ encourages members to participate in such surveys because they provide us with important information regarding the improvement of HighRQ’s service(s). You may also volunteer for certain surveys that HighRQ may offer to HighRQ’s users, and any additional rules regarding the conduct of such surveys will be disclosed to you prior to your or HighRQ’s participation.
//
// <br/><br/>HighRQ encourages you to refer a friend to HighRQ’s service(s) by sending us a friend’s name and email address. HighRQ will keep this information in HighRQ’s database, and send that person a one-time e-mail containing HighRQ’s name and inviting them to visit HighRQ’s site. This e-mail will also include instructions on how to remove their information from HighRQ’s database. You agree that you will not abuse this feature by entering names and addresses of those who would not be interested in HighRQ’s service(s). For some of HighRQ’s service(s), you may also give gift memberships to HighRQ’s friends, in which case HighRQ will use HighRQ’s friends’ e-mail address that you provide in order to deliver the gift.
//
// <br/><br/>HighRQ’s Forum contains posts which are relevant to relationships and is available to HighRQ’s users and visitors.
//
// <br/><br/>Said posts will be subject to the rules, common guidelines and standards regarding posts, and will be posted on the appropriate webpage on the site.   You agree to submit posts that conform to these rules, common guidelines and standards.   Any posts that do not conform to the rules, common guidelines and standards will be removed at the sole discretion of the HighRQ Forum moderator.
//
// <br/><br/>Any information that is disclosed in the comments section of any advice post becomes public information.   You should exercise caution when deciding to disclose any personal information.  Please consult the community guidelines for each HighRQ discussion board when posting comments on them for other specific information.  To request removal of HighRQ’s personal information from HighRQ’s blog, contact us at admin@highrq.com. In some cases, HighRQ may not be able to remove HighRQ’s personal information and shall not be liable.
//
// <br/><br/>In addition to the uses outlined above, by using HighRQ’s site, you agree to allow us to anonymously use the information from you and HighRQ’s experiences to continue HighRQ’s research into successful relationships and the qualities individuals must have to be successful–that being THE major purpose of this HighRQ website.  You agree to allow HighRQ to analyze members’ online behavior. HighRQ may create anonymous user profiles in order to improve HighRQ’s service(s) to you. For this, HighRQ uses Google Analytics, among other things (with the feature Universal Analytics).   This research, may be utilized by psychologists and behavior research scientists, and may or may not be published in academic journals.  However, all of HighRQ’s member’s responses will be kept anonymous, and no personal information will be published.
//
// <br/><br/>When you become a member, you agree and consent to receive email messages from us. These emails may be transactional or relationship communications relating to the service(s), such as administrative notices and service(s) announcements or changes, or emails containing commercial offers, promotions or special offers from us or third party partners.  From time to time, employees of HighRQ (or its parent or affiliated companies) may create test dating profiles for the purpose of testing the functionality of HighRQ’s service(s) and HighRQ website processes to improve service(s) quality for HighRQ’s members.
//
// <br/><br/>Should telephonic support be offered, any and all calls between you and HighRQ’s customer care representatives may be recorded for quality assurance purposes.
//
// <br/><br/>The following applies to any mobile software you acquire or download from the iTunes Store or the App Store provided by Apple (“iTunes-Sourced Software”): You acknowledge and agree that this agreement is solely between you and HighRQ, not Apple, and that Apple has no responsibility for the iTunes-sourced software or content thereof. HighRQ’s use of the iTunes-Sourced software must comply with the App Store Terms of Service(s). You acknowledge that Apple has no obligation whatsoever to furnish any maintenance and support service(s) with respect to the iTunes-Sourced software. In the event of any failure of the iTunes-Sourced software to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price for the iTunes-Sourced software to you; to the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with respect to the iTunes-Sourced software, and any other claims, losses, liabilities, damages, costs or expenses attributable to any failure to conform to any warranty will be solely governed by this agreement and any law applicable to HighRQ as provider of the software. You acknowledge that Apple is not responsible for addressing any claims of you or any third party relating to the iTunes-Sourced software or HighRQ’s possession and/or use of the iTunes-Sourced software, including, but not limited to product liability claims, any claim that the iTunes-Sourced software fails to conform to any applicable legal or regulatory requirement, and claims arising under consumer protection or similar legislation, and all such claims are governed solely by this agreement and any law applicable to HighRQ as provider of the software. You and HighRQ acknowledge and agree that Apple, and Apple’s subsidiaries, are third party beneficiaries of this agreement as relates to HighRQ’s license of the iTunes-Sourced software, and that, upon HighRQ’s acceptance of the terms and conditions of this agreement, Apple will have the right (and will be deemed to have accepted the right) to enforce this Agreement as relates to HighRQ’s license of the iTunes-Sourced software against you as a third party beneficiary thereof. Without limiting any other terms of this agreement, you must comply with all applicable third party terms of agreement when using iTunes-Sourced software.
//
// <br/><br/>This agreement does not entitle you to receive from HighRQ, its licensors, or Apple, any hard-copy documentation, support, telephone assistance, maintenance, enhancements or updates to the mobile software.
//
// <br/><br/>The mobile software and the underlying information and technology may not be downloaded or otherwise exported or re-exported into (or to a national or resident of) any country that is subject to a U.S. Government embargo or has been designated by the U.S. Government as a “terrorist supporting” country, or to anyone on the U.S. Treasury Department’s list of Specially Designated Nationals or the U.S. Commerce Department’s Table of Deny Orders. By downloading or using the software and/or documentation, you are agreeing to the foregoing and you represent and warrant that you are not located in, under the control of, or a national or resident of any such country or on any such list, are not listed on any U.S. Government list of prohibited or restricted parties, and you agree to comply with all United States and foreign laws related to use of the mobile software and other HighRQ service(s).
//
// <br/><br/>If you are using the mobile software outside the U.S.A., then the following shall apply: you confirm that this agreement and all related documentation is and will be in the English language, that you are responsible for complying with any local laws in HighRQ’s jurisdiction which might impact HighRQ’s right to import, export or use the mobile software or any service(s) accessed or used in connection with the mobile software, and you represent that you have complied with any regulations or registration procedures required by applicable law to make this license enforceable.
//
// <br/><br/>You acknowledge and agree that HighRQ’s breach or threatened breach of this section shall cause HighRQ irreparable damage for which recovery of money damages would be inadequate and that HighRQ therefore may seek timely injunctive relief to protect its rights under this agreement in addition to any and all other remedies available at law or in equity.
//
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Arbitration Agreement and Class Action Waiver"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `This arbitration agreement facilitates the prompt and efficient resolution of any disputes that may arise between you and HighRQ.  Arbitration is a private dispute resolution forum in which parties to a contract agree to submit their disputes and potential disputes to a neutral third person (called an arbitrator) for a binding decision, instead of having such dispute(s) decided in a lawsuit, using a judge with or without a jury trial.
//
// <br/><br/>All disputes between you and HighRQ shall be resolved by binding arbitration. Arbitration replaces the right to go to court.  In the absence of this arbitration agreement, you may otherwise have a right or opportunity to bring claims to a judge or jury, and/or to participate in or be represented in a case filed in court by others (including, but not limited to, class actions).  Entering into this arbitration agreement also constitutes a waiver of HighRQ’s right to litigate claims in court and all opportunity to be heard by a judge or jury.  There is no judge or jury in arbitration, and usually an arbitration award is limited.  The arbitrator must follow this arbitration agreement and can award the same damages and relief as a court, including attorney’s fees, if otherwise authorized by applicable law.
//
// <br/><br/>For the purpose of this arbitration agreement, “HighRQ” means HighRQ, Inc or HighRQ.com., it’s parents, subsidiaries and affiliated companies, and each of their respective officers, directors, employees and agents.  The term “Dispute” means any dispute, claim, or controversy between you and HighRQ regarding any aspect of HighRQ’s relationship with you, whether based in contract, statute, regulation, ordinance, tort (including, but not limited to, fraud, misrepresentation, fraudulent inducement, negligence, gross negligence or reckless behavior), or any other legal or equitable theory, and includes the validity, enforceability or scope of this arbitration agreement (with the exception of the enforceability of the Class Action Waiver clause below). “Dispute” is to be given the broadest possible meaning that will be enforced.
//
// <br/><br/>HighRQ and you each agree that, except as provided below, any and all disputes, as defined above, whether presently in existence or based on acts or omissions in the past or in the future, will be resolved exclusively and finally by binding arbitration rather than in court in accordance with this arbitration agreement.
//
// <br/><br/>For all disputes you must first give HighRQ an opportunity to resolve the dispute.  You must commence this process by mailing written notification to admin@highrq.com.  That written notification must include HighRQ’s name, HighRQ’s address, a written description of the dispute, and a description of the specific relief you seek.  If HighRQ does not resolve the dispute to HighRQ’s and your satisfaction within 45 days after it receives written notification, you may pursue HighRQ’s dispute in arbitration.
//
// <br/><br/>If this arbitration agreement applies and the dispute is not resolved either you or HighRQ may initiate arbitration proceedings.  The American Arbitration Association (“AAA”), www.adr.org, or JAMS, www.jamsadr.com, will arbitrate all disputes, and the arbitration will be conducted before a single arbitrator.  The arbitration shall be commenced as an individual arbitration, and shall in no event be commenced as a representative or class arbitration.  All issues shall be for the arbitrator to decide, including the scope of this arbitration agreement.
//
// <br/><br/>Because HighRQ’s contract concerns interstate commerce, the Federal Arbitration Act (“FAA”) governs the arbitrability of all disputes. However, the arbitrator will apply applicable substantive law consistent with the FAA and the applicable statute of limitations or condition precedent to suit.
//
// <br/><br/>The arbitrator may award, on an individual basis, any relief that would be available pursuant to applicable law, and will not have the power to award relief to, against or for the benefit of any person who is not a party to the proceeding.  The arbitrator shall make any award in writing but need not provide a statement of reasons unless requested by a party.  Such award by the arbitrator will be final and binding on the parties, except for any right of appeal provided by the FAA, and may be entered in any court having jurisdiction over the parties for purposes of enforcement.
//
// <br/><br/>You may initiate arbitration in your city or in the federal judicial district that includes HighRQ’s address that you provide in HighRQ’s written notification of Pre-Arbitration Dispute Resolution. In the event that HighRQ initiates an arbitration, it may only do so in the federal judicial district that includes HighRQ’s address that you provide in HighRQ’s written notification of Pre-Arbitration Dispute Resolution.
//
// <br/><br/>The parties agree that the arbitrator may not consolidate more than one person’s claims, and may not otherwise preside over any form of a class or representative proceeding or claims (such as a class action, representative action, consolidated action or private attorney general action) unless both you and HighRQ specifically agree in writing to do so following initiation of the arbitration.  Neither you, nor any other member of HighRQ and/or user of HighRQ service(s), can be a class representative, class member, or otherwise participate in a class, representative, consolidated or private attorney general proceeding.
//
// <br/><br/>You will pay all arbitration filing fees and arbitrator’s costs and expenses prior to the commencement of the arbitration.  You are also responsible for all additional fees and costs that you incur in the arbitration, including, but not limited to, attorneys or expert witnesses, travel, meals, copying documents, etc.  Fees and costs may be awarded as provided pursuant to applicable law.  In addition to any rights to recover fees and costs under applicable law, if you provide notice and negotiate in good faith with HighRQ as provided in the section above titled “Pre-Arbitration Dispute Resolution” and the arbitrator concludes that you are the prevailing party in the arbitration, you will be entitled to recover from HighRQ actual and reasonable attorney’s fees and costs as determined by the arbitrator.
//
// <br/><br/>If any clause within this arbitration agreement, other than the class action waiver clause above, is found to be illegal or unenforceable, that clause will be severed from this arbitration agreement and the remainder of this arbitration agreement will be given full force and effect.  Any proceeding to enforce this arbitration agreement, including any proceeding to confirm, modify, or vacate an arbitration award, may be commenced in any court of competent jurisdiction.  In the event that this arbitration agreement is for any reason held to be unenforceable, any litigation against HighRQ, except for small-claims court actions, may be commenced only in the federal or state court located in (to be arranged) County, (to be arranged). You hereby irrevocably consent to the jurisdiction of those courts for such purposes.
//
// <br/><br/>This arbitration agreement shall survive the termination of HighRQ’s contract with you and your use of HighRQ’s service(s).
//
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Indemnity"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `You agree to defend, indemnify and hold HighRQ, its subsidiaries and affiliates, and each of their directors, officers, managers, agents, contractors, partners and employees harmless from any loss, liability, claim, damages, costs, debts, expenses or demand, including reasonable attorney’s fees, due to or arising from your use of or access to the HighRQ service(s), including any data or content transmitted or received by you, or your or HighRQ’s inability to use the service(s), any claim or damages that arise as a result of any of HighRQ’s user content or any user content that is submitted via HighRQ’s account, HighRQ’s conduct in connection with the service(s) or HighRQ’s users, HighRQ’s violation of any of the terms of this agreement, including without limitation HighRQ’s breach of any of the representations and warranties above, HighRQ’s violation of any rights of a third party, including without limitation any right of privacy or intellectual property rights, any other party’s access and use of the service(s) with HighRQ’s unique username, password or other appropriate security code or HighRQ’s violation of any applicable laws, rules or regulations.
//
// <br/><br/>If any clause within this section is found to be illegal or unenforceable, that clause will be severed from this section and the remainder of the section will be given full force and effect.
//
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Miscellaneous"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `HighRQ reserves the right at any time to modify or discontinue, temporarily or permanently, the HighRQ website or the service(s) (or any part thereof) with or without notice. You agree that HighRQ shall not be liable to you or to any third party for any modification, suspension or discontinuance of the service(s). To protect the integrity of the HighRQ website or the service(s), HighRQ reserves the right at any time in its sole discretion to block users from certain IP addresses from accessing the HighRQ website or service(s).
//
// <br/><br/>This agreement, and any rights and licenses granted hereunder, may not be transferred or assigned by you, but may be assigned by HighRQ without restriction. Any attempted transfer or assignment in violation hereof shall be null and void. You agree that this agreement, together with the privacy policy and any additional terms, contains the entire agreement between HighRQ and you regarding the use of the service(s) supersedes all prior agreements and understandings, including without limitation any prior versions of this agreement, except to the extent that the parties have entered into a separate written agreement applicable to the service(s) that expressly governs over this agreement.  There are no third-party beneficiaries to this agreement and no third party who is not a party to this agreement shall have any right to enforce any term of this agreement.
//
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Termination"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `Unless otherwise provided, this agreement is effective upon HighRQ’s first use of the service(s) and shall remain in effect until it is terminated in accordance with the terms of this agreement.  Notwithstanding anything to the contrary in this agreement, HighRQ may suspend, deactivate or terminate HighRQ’s account and HighRQ’s right to use the service(s) and may block or prevent HighRQ’s access to and use of the service(s) at any time in its sole discretion, for any reason or no reason, without explanation and without notice, including without limitation blocking users or members from certain IP addresses. HighRQ also reserves the right to remove or block access to HighRQ’s account information, user content or data from HighRQ’s service(s) and any other records at any time at HighRQ’s sole discretion. In the event that HighRQ determines that HighRQ’s access to any of the service(s) is terminated or suspended for cause, such as due to any breach of this agreement, flagged conduct or content, third party complaints or the implementation of HighRQ’s repeat infringer policy, you agree that all fees then paid to HighRQ by you will be nonrefundable, except as otherwise provided by law, and all outstanding or pending payments under the terms of HighRQ’s subscription will immediately be due and payable. All decisions as to the refundability of the fees are at HighRQ’s sole discretion. Notwithstanding the foregoing, you may dispute any refunds of fees pursuant to this agreement by notifying HighRQ through the channels described in this agreement, and during the applicable time limitations, also described in this agreement.
//
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Technology Requirements"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `The technology you use to access HighRQ’s service(s) may be required to meet minimum specifications provided by us.
//
// <br/><br/>HighRQ may require that you download and install updates to the Apps from time to time.  You acknowledge and agree that HighRQ may update the Apps with or without notifying you and add or remove features or functions to the Apps (and/or the Apps, the HighRQ websites and/or the service(s)) at any time in HighRQ’s sole discretion.
//
// <br/><br/>You acknowledge and agree that HighRQ has no obligation to make any subsequent versions of the Apps available to you, make the Apps, the HighRQ websites and/or the service(s) available to you at all, continue to support the Apps, the HighRQ websites and/or the service(s) in any way.  You acknowledge that HighRQ’s access to the Apps, the HighRQ websites and/or the service(s) may not be continuous, features may change during HighRQ’s use, and HighRQ may terminate HighRQ’s access or stop offering any or all of the Apps, the HighRQ websites and/or the service(s) at any time.
//
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Online Dating Safety Guide"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `(To be used when Level 3 service(s) become available)
//
// <br/><br/>Do not get a false sense of security because you’re on a dating site.
//
// <br/><br/>Do not include last name or any other identifying information such as place of work in HighRQ’s profile or initial communications.
//
// <br/><br/>Do not include contact information such as email address, home address, or phone number in HighRQ’s profile or initial communications.
//
// <br/><br/>Use caution when accessing HighRQ’s account from a public or shared computer so that others cannot view or record HighRQ’s password or personal information.
//
// <br/><br/>Act with caution and learn more about someone and evaluate the relationship before contacting him or her outside of HighRQ on the phone or through HighRQ’s personal email or social media accounts. Also, consider using an anonymous email address.
//
// <br/><br/>Take time to get to know someone before sharing your full identity or personal information.
//
// <br/><br/>Do your own research to learn more about someone and make informed decisions before you meet. Check to see if the person you are interested in is on other social networking sites.   Do a search to see if there are other records of the person online, and use government resources that are either paid or publicly available.
//
// <br/><br/>Do not send anyone money.
//
// <br/><br/>When meeting someone in person for the first time, take precautions.  Meet in a public place with lots of people around.   Let friends or family members know where you’re going and when you’ll be home.  Arrange to contact a friend when the date is over.
//
// <br/><br/>Use public or privately paid transportation to get to and from the date.
//
// <br/><br/>Watch your alcohol intake or drug use and watch your drink at all times.
//
// <br/><br/>Keep your wallet and personal items with you.  Bring a cell phone with you and be accessible; meaning, having the ability to make and receive phone calls.
//
// <br/><br/>Leave at any time you feel uncomfortable and do not feel obligated to resume contact, even if only on the HighRQ website.
//
// <br/><br/>Check with the HighRQ website for instructions on how to block contacts, should this become necessary.
//
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="px-8 space-y-8 mb-4">
//                                     <FaqItem
//                                         question="Revision Date"
//                                         answer={
//                                             <div
//                                                 dangerouslySetInnerHTML={{
//                                                     __html: `This Agreement was last revised on 09/14/2019.
//
// <br/><br/>Copyright © Pending, 06/22/2019.  HighRQ, Inc. All Rights Reserved. HighRQ, Relationship quotient (RQ), Compatibility Quotient (CQ), and several other marks, colors, and images are registered and common law trademarks of HighRQ, Inc. Other trademarks and brands are the property of their respective owners.
//
// `,
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                 </div>
//
//                                 <div className="absolute top-0 right-0 z-[-1] opacity-30 lg:opacity-100">
//                                     <svg
//                                         width="450"
//                                         height="556"
//                                         viewBox="0 0 450 556"
//                                         fill="none"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                         <circle
//                                             cx="17.9997"
//                                             cy="182"
//                                             r="18"
//                                             fill="url(#paint1_radial_25:217)"
//                                         />
//                                         <circle
//                                             cx="76.9997"
//                                             cy="288"
//                                             r="34"
//                                             fill="url(#paint2_radial_25:217)"
//                                         />
//                                         <circle
//                                             cx="325.486"
//                                             cy="302.87"
//                                             r="180"
//                                             transform="rotate(-37.6852 325.486 302.87)"
//                                             fill="url(#paint3_linear_25:217)"
//                                         />
//                                         <circle
//                                             opacity="0.8"
//                                             cx="184.521"
//                                             cy="315.521"
//                                             r="132.862"
//                                             transform="rotate(114.874 184.521 315.521)"
//                                             stroke="url(#paint4_linear_25:217)"
//                                         />
//                                         <circle
//                                             opacity="0.8"
//                                             cx="356"
//                                             cy="290"
//                                             r="179.5"
//                                             transform="rotate(-30 356 290)"
//                                             stroke="url(#paint5_linear_25:217)"
//                                         />
//                                         <circle
//                                             opacity="0.8"
//                                             cx="191.659"
//                                             cy="302.659"
//                                             r="133.362"
//                                             transform="rotate(133.319 191.659 302.659)"
//                                             fill="url(#paint6_linear_25:217)"
//                                         />
//                                         <defs>
//                                             <linearGradient
//                                                 id="paint0_linear_25:217"
//                                                 x1="-54.5003"
//                                                 y1="-178"
//                                                 x2="222"
//                                                 y2="288"
//                                                 gradientUnits="userSpaceOnUse"
//                                             >
//                                                 <stop stopColor="#4A6CF7" />
//                                                 <stop
//                                                     offset="1"
//                                                     stopColor="#4A6CF7"
//                                                     stopOpacity="0"
//                                                 />
//                                             </linearGradient>
//                                             <radialGradient
//                                                 id="paint1_radial_25:217"
//                                                 cx="0"
//                                                 cy="0"
//                                                 r="1"
//                                                 gradientUnits="userSpaceOnUse"
//                                                 gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
//                                             >
//                                                 <stop
//                                                     offset="0.145833"
//                                                     stopColor="#4A6CF7"
//                                                     stopOpacity="0"
//                                                 />
//                                                 <stop
//                                                     offset="1"
//                                                     stopColor="#4A6CF7"
//                                                     stopOpacity="0.08"
//                                                 />
//                                             </radialGradient>
//                                             <radialGradient
//                                                 id="paint2_radial_25:217"
//                                                 cx="0"
//                                                 cy="0"
//                                                 r="1"
//                                                 gradientUnits="userSpaceOnUse"
//                                                 gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
//                                             >
//                                                 <stop
//                                                     offset="0.145833"
//                                                     stopColor="#4A6CF7"
//                                                     stopOpacity="0"
//                                                 />
//                                                 <stop
//                                                     offset="1"
//                                                     stopColor="#4A6CF7"
//                                                     stopOpacity="0.08"
//                                                 />
//                                             </radialGradient>
//                                             <linearGradient
//                                                 id="paint3_linear_25:217"
//                                                 x1="226.775"
//                                                 y1="-66.1548"
//                                                 x2="292.157"
//                                                 y2="351.421"
//                                                 gradientUnits="userSpaceOnUse"
//                                             >
//                                                 <stop stopColor="#4A6CF7" />
//                                                 <stop
//                                                     offset="1"
//                                                     stopColor="#4A6CF7"
//                                                     stopOpacity="0"
//                                                 />
//                                             </linearGradient>
//                                             <linearGradient
//                                                 id="paint4_linear_25:217"
//                                                 x1="184.521"
//                                                 y1="182.159"
//                                                 x2="184.521"
//                                                 y2="448.882"
//                                                 gradientUnits="userSpaceOnUse"
//                                             >
//                                                 <stop stopColor="#4A6CF7" />
//                                                 <stop
//                                                     offset="1"
//                                                     stopColor="white"
//                                                     stopOpacity="0"
//                                                 />
//                                             </linearGradient>
//                                             <linearGradient
//                                                 id="paint5_linear_25:217"
//                                                 x1="356"
//                                                 y1="110"
//                                                 x2="356"
//                                                 y2="470"
//                                                 gradientUnits="userSpaceOnUse"
//                                             >
//                                                 <stop stopColor="#4A6CF7" />
//                                                 <stop
//                                                     offset="1"
//                                                     stopColor="white"
//                                                     stopOpacity="0"
//                                                 />
//                                             </linearGradient>
//                                             <linearGradient
//                                                 id="paint6_linear_25:217"
//                                                 x1="118.524"
//                                                 y1="29.2497"
//                                                 x2="166.965"
//                                                 y2="338.63"
//                                                 gradientUnits="userSpaceOnUse"
//                                             >
//                                                 <stop stopColor="#4A6CF7" />
//                                                 <stop
//                                                     offset="1"
//                                                     stopColor="#4A6CF7"
//                                                     stopOpacity="0"
//                                                 />
//                                             </linearGradient>
//                                         </defs>
//                                     </svg>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }
//
// export default TosPage

'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import tosData from '@/components/(menu)/Tos/Data/tosData.json'

const FaqItem = ({ title, content }: { title: string; content: string }) => {
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{content}</p>
        </div>
    )
}

export default function TosPage() {
    return (
        <section
            id="tos"
            className="relative z-10 bg-slate-100 overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4">
                        <Card className="mx-auto max-w-4xl bg-white shadow-lg">
                            <CardContent className="p-8">
                                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Terms of Service</h1>
                                {tosData.sections.map((section, index) => (
                                    <div key={index}>
                                        <span
                                            className="text-xl font-bold text-center mb-8 text-gray-800">{section.title}</span>
                                        <FaqItem title={section.title} content={section.content} />
                                    </div>
                                ))}

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 z-[-1] opacity-30 lg:opacity-100">
                <svg
                    width="450"
                    height="556"
                    viewBox="0 0 450 556"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="17.9997"
                        cy="182"
                        r="18"
                        fill="url(#paint1_radial_25:217)"
                    />
                    <circle
                        cx="76.9997"
                        cy="288"
                        r="34"
                        fill="url(#paint2_radial_25:217)"
                    />
                    <circle
                        cx="325.486"
                        cy="302.87"
                        r="180"
                        transform="rotate(-37.6852 325.486 302.87)"
                        fill="url(#paint3_linear_25:217)"
                    />
                    <circle
                        opacity="0.8"
                        cx="184.521"
                        cy="315.521"
                        r="132.862"
                        transform="rotate(114.874 184.521 315.521)"
                        stroke="url(#paint4_linear_25:217)"
                    />
                    <circle
                        opacity="0.8"
                        cx="356"
                        cy="290"
                        r="179.5"
                        transform="rotate(-30 356 290)"
                        stroke="url(#paint5_linear_25:217)"
                    />
                    <circle
                        opacity="0.8"
                        cx="191.659"
                        cy="302.659"
                        r="133.362"
                        transform="rotate(133.319 191.659 302.659)"
                        fill="url(#paint6_linear_25:217)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_25:217"
                            x1="-54.5003"
                            y1="-178"
                            x2="222"
                            y2="288"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4A6CF7" />
                            <stop
                                offset="1"
                                stopColor="#4A6CF7"
                                stopOpacity="0"
                            />
                        </linearGradient>
                        <radialGradient
                            id="paint1_radial_25:217"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
                        >
                            <stop
                                offset="0.145833"
                                stopColor="#4A6CF7"
                                stopOpacity="0"
                            />
                            <stop
                                offset="1"
                                stopColor="#4A6CF7"
                                stopOpacity="0.08"
                            />
                        </radialGradient>
                        <radialGradient
                            id="paint2_radial_25:217"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
                        >
                            <stop
                                offset="0.145833"
                                stopColor="#4A6CF7"
                                stopOpacity="0"
                            />
                            <stop
                                offset="1"
                                stopColor="#4A6CF7"
                                stopOpacity="0.08"
                            />
                        </radialGradient>
                        <linearGradient
                            id="paint3_linear_25:217"
                            x1="226.775"
                            y1="-66.1548"
                            x2="292.157"
                            y2="351.421"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4A6CF7" />
                            <stop
                                offset="1"
                                stopColor="#4A6CF7"
                                stopOpacity="0"
                            />
                        </linearGradient>
                        <linearGradient
                            id="paint4_linear_25:217"
                            x1="184.521"
                            y1="182.159"
                            x2="184.521"
                            y2="448.882"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4A6CF7" />
                            <stop
                                offset="1"
                                stopColor="white"
                                stopOpacity="0"
                            />
                        </linearGradient>
                        <linearGradient
                            id="paint5_linear_25:217"
                            x1="356"
                            y1="110"
                            x2="356"
                            y2="470"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4A6CF7" />
                            <stop
                                offset="1"
                                stopColor="white"
                                stopOpacity="0"
                            />
                        </linearGradient>
                        <linearGradient
                            id="paint6_linear_25:217"
                            x1="118.524"
                            y1="29.2497"
                            x2="166.965"
                            y2="338.63"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4A6CF7" />
                            <stop
                                offset="1"
                                stopColor="#4A6CF7"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    )
}