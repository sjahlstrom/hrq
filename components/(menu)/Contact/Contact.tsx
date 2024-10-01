import NewsLatterBox from './NewsLatterBox'

const Contact = () => {
   return (
      <div className="bg-wild-blue">
         <section
            id="contact"
            className="overflow-hidden py-16 md:py-20 lg:py-28"
         >
            <div className="container">
               <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                     <div
                        className="mb-12 rounded-md bg-primary/[3%] px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] dark:bg-dark"
                     >
                        <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl dark:text-white">
                           Need help? Let us know
                        </h2>
                        <p className="mb-12 text-base font-medium text-body-color">
                           Our support team will get back to you ASAP via email.
                        </p>
                        <form>
                           <div className="-mx-4 flex flex-wrap">
                              <div className="w-full px-4 md:w-1/2">
                                 <div className="mb-8">
                                    <label
                                       htmlFor="name"
                                       className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                    >
                                       Your Name
                                    </label>
                                    <input
                                       type="text"
                                       placeholder="Enter your name"
                                       className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
                                    />
                                 </div>
                              </div>
                              <div className="w-full px-4 md:w-1/2">
                                 <div className="mb-8">
                                    <label
                                       htmlFor="email"
                                       className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                    >
                                       Your Email
                                    </label>
                                    <input
                                       type="email"
                                       placeholder="Enter your email"
                                       className="shadow-one dark:shadow-signUp w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
                                    />
                                 </div>
                              </div>
                              <div className="w-full px-4">
                                 <div className="mb-8">
                                    <label
                                       htmlFor="message"
                                       className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                    >
                                       Your Message
                                    </label>
                                    <textarea
                                       name="message"
                                       rows={5}
                                       placeholder="Enter your Message"
                                       className="shadow-one dark:shadow-signUp w-full resize-none rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51]"
                                    ></textarea>
                                 </div>
                              </div>
                              <div className="w-full px-4">
                                 <button className="hover:shadow-signUp rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80">
                                    Submit Questions
                                 </button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
                  <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
                     <NewsLatterBox />
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default Contact
