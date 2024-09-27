'use client'

import { arimo, laila } from '@/app/ui/fonts'

const Hero = () => {
    return (
        <>

            <div className="bg-first h-[140px]"></div>

            <section
                id="home"
                className="bg-first  relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px] bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/hero/silhouette.svg')",
                    minHeight: '88vh',
                    backgroundSize: '90%',
                }}
            >
                <div className=" container mt-[-80px]">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div
                                className="mx-auto max-w-[800px] text-center"
                                data-wow-delay=".2s"
                            >
                                <h1 className={`${laila.className} mb-5 -mt-20 text-3xl font-semibold text-black dark:text-fifth sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight`}>
                                    High Relationship Quotient
                                </h1>
                                <p className={`${laila.className} mb-12 text-base font-small !leading-relaxed text-body-color dark:text-fifth  dark:opacity-90 sm:text-lg md:text-xl`}>
                                    Find your relationship quotient and learn why your dating life has not been
                                    as successful as you would like
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SVG code remains unchanged */}
            </section>
        </>
    );
};

export default Hero;
