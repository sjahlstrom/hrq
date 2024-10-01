'use client'

import { nunito, palanquin } from '@/app/ui/fonts'
import Image from 'next/image'

export default function Hero() {
    return (
        <>
            <div className="bg-fifth h-[84px]"></div>

            <section
                id="home"
                className="relative  z-10 overflow-hidden pt-[120px] pb-16 md:pt-[160px] md:pb-[130px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px] bg-first min-h-[92vh]"
            >
                <div className="absolute inset-0 z-[-1] flex items-center justify-center">
                    <Image
                        src="/images/hero/test.jpg"
                        alt="Background image"
                        fill
                        priority={true}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap">
                        <div className="text-third w-full">
                            <div className="mx-auto max-w-[800px] text-center">
                                <h1 className={`${nunito.className} mb-5 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight`}>
                                    High Relationship Quotient
                                </h1>
                                <p className={`${palanquin.className} mb-12 text-sm sm:text-base md:text-lg lg:text-xl font-small leading-relaxed`}>
                                    Find your relationship quotient and learn why your dating life has not been
                                    as successful as you would like
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}