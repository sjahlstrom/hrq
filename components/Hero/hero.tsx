'use client'

import { nunito, telex } from '@/app/ui/fonts'
import Image from 'next/image'
import AuthButton from '@/components/Hero/auth-button'
import React from 'react'

export default function Hero() {
    return (
        <section
            id="home"
            className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[160px] md:pb-[130px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px] min-h-[84vh]"
        >
            <div className="absolute inset-0" style={{ zIndex: -1 }}>
                <Image
                    src="/images/hero/landing.jpg"
                    alt="Background image"
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div className="container mx-auto px-4 ">
                <div className="-mt-12 relative w-full ">
                    <div className="mx-auto -mt-16 max-w-[800px] text-center ">
                        <h1
                            // className={`${nunito.className} animate-fade-in text-hrqColors-skyBlue-200  mb-3 text-2xl font-bold leading-tight  sm:text-3xl sm:mt-12 md:text-4xl lg:text-6xl xl:text-6xl`}
                            className={`${nunito.className} animate-fade-in text-hrqColors-skyBlue-200 mb-3 text-2xl font-bold leading-tight 
[&:not(sm)]:mt-12 sm:text-3xl sm:mt-12 md:-mt-12 md:text-5xl lg:-mt-28 xl:text-6xl`}
                        >
                            High Relationship Quotient
                            <br />
                            <div className="font-medium text-2xl">(HRQ)</div>
                        </h1>
                        <p
                            className={`${telex.className} animate-slideUp text-white mb-12 text-sm font-semibold leading-relaxed sm:text-base md:text-lg lg:text-xl`}
                        >
                            Do you have one? Do you know your strengths? Your
                            weaknesses? Are you a good catch?
                        </p>
                    </div>
                </div>
                <div className=" flex justify-center items-center">
                    <div className=" mt-40 flex items-center justify-between">
                        <AuthButton />
                    </div>
                </div>
            </div>
        </section>
    )
}
