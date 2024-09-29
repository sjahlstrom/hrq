'use client'

import { nunito, palanquin, arimo, laila, telex } from '@/app/ui/fonts'
import Image from 'next/image'

export default function Hero() {
    return (
        <>
            <div className="bg-first h-[140px]"></div>

            <section
                id="home"
                className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px] bg-first min-h-[88vh]"
            >
                <div className="absolute inset-0 z-[-1] flex items-center justify-center mt-40">
                    <Image
                        src="/images/hero/hands.svg"
                        alt="Background image of hands"
                        width={800}
                        height={800}
                        className="opacity-10"
                    />
                </div>
                <div className="container mt-[-80px] px-4">
                    <div className="flex flex-wrap">
                        <div className="text-third w-full">
                            <div
                                className="mx-auto max-w-[800px] text-center"
                                data-wow-delay=".2s"
                            >
                                <h1 className={`${nunito.className} mb-5 text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl leading-tight`}>
                                    High Relationship Quotient
                                </h1>
                                <p className={`${palanquin.className} mb-12 text-xs sm:text-base md:text-lg lg:text-xl font-small leading-relaxed`}>
                                    Find your relationship quotient and learn why your dating life has not been
                                    as successful as you would like
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}