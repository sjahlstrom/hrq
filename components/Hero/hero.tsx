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

            <div className="container mx-auto px-4">
                <div className="relative w-full">
                    <div className="mx-auto max-w-[800px] text-center">
                        <h1
                            className={`${nunito.className} animate-fade-in text-blue-900 mb-5 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl`}
                        >
                            High Relationship Quotient
                        </h1>
                        <p
                            className={`${telex.className} animate-slideUp text-white mb-12 text-sm font-semibold leading-relaxed sm:text-base md:text-lg lg:text-xl`}
                        >
                            Life is a balancing act. <br />
                            Find how to get yours in balance and improve all of your relationships.
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