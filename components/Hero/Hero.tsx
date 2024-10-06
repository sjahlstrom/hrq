'use client'

import { nunito, telex } from '@/app/ui/fonts'
import Image from 'next/image'

export default function Hero() {
    return (
        <section
            id="home"
            className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[160px] md:pb-[130px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px] min-h-[82vh]"
        >
            <div className="absolute inset-0 z-[-1] flex items-center justify-center">
                <Image
                    src="/images/hero/landing.jpg"
                    alt="Background image"
                    fill
                    priority={true}
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="relative w-full">
                <div className="absolute -top-5 left-[10px] w-2/3 text-third">
                    <div className="mx-auto max-w-[800px] text-center">
                        <h1
                            className={`${nunito.className} text-blue-900 mb-5 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight`}
                        >
                            High Relationship Quotient
                        </h1>
                        <p
                            className={`${telex.className}  text-cinnabar-200 mb-12 text-sm sm:text-base md:text-lg lg:text-xl font-small leading-relaxed text-semibold`}
                        >
                            Life is a balancing act.{' '}
                            <p>
                                Find out how to get get yours in balance and
                                improve all of your relationships.
                            </p>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
