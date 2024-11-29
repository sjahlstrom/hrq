import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import { nunito } from '@/app/ui/fonts'
import AuthButton from '@/components/Hero/auth-button'

export default function About() {
    const benefits = [
        'Improve your dating life',
        'Enhance work relationships',
        'Strengthen family bonds',
        'Build lasting friendships',
        'Increase emotional intelligence',
    ]

    return (
        <section
            id="about"
            className="bg-gradient-to-b from-hrqColors-slateBlue-400 to-hrqColors-slateBlue-200 py-16 md:py-24 lg:py-32 min-h-screen"
        >
            <div className="container mx-auto px-4 max-w-4xl xl:max-w-6xl">
                <h1
                    className={`${nunito.className} -mt-12 animate-fade-in text-dark mb-5 font-bold leading-tight sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl text-center mx-auto`}
                >
                    Welcome to High Relationship Quotient
                </h1>

                <p className="text-xl md:text-2xl text-hrqColors-slateBlue-900 mb-16 text-center max-w-3xl mx-auto">
                    Discover the next evolution in measuring human potential,
                    especially in relationships.
                </p>

                <div className="grid gap-8 md:grid-cols-2 mb-16">
                    <Card className="rounded bg-hrqColors-slateBlue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-semibold mb-4 text-hrqColors-slateBlue-900">
                                What is RQ?
                            </h2>
                            <p className="text-hrqColors-slateBlue-800 leading-relaxed">
                                RQ, or Relationship Quotient, is a new concept
                                similar to IQ but focused on relationships. It
                                measures the qualities, traits, and skills that
                                define your ability to maintain relationships.
                                Just like IQ tests intelligence, RQ evaluates
                                your relational strengths.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded bg-hrqColors-slateBlue-200  shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-semibold mb-4 text-hrqColors-slateBlue-900">
                                Why is RQ important?
                            </h2>
                            <p className="text-hrqColors-slateBlue-800 leading-relaxed">
                                Our traits influence relationship success or
                                failure, not just in dating but in all areas of
                                life—work, family, friendships. A high RQ helps
                                you build stronger, lasting connections
                                everywhere.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="rounded bg-hrqColors-slateBlue-200  shadow-lg mb-16">
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-semibold mb-4 text-hrqColors-slateBlue-900">
                            Why are you here?
                        </h2>
                        <p className="text-hrqColors-slateBlue-800 leading-relaxed">
                            You&apos;re here to discover your RQ. Are you
                            relationship-ready? Do you have what it takes to be
                            a high-quality partner? Understanding your RQ is the
                            first step towards improving all aspects of your
                            relationships.
                        </p>
                    </CardContent>
                </Card>

                <Card className="rounded bg-hrqColors-slateBlue-700 text-white shadow-lg">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-semibold mb-6 text-center">
                            Key Benefits of Understanding Your RQ
                        </h2>
                        <ul className="grid gap-4 md:grid-cols-2">
                            {benefits.map((benefit, index) => (
                                <li
                                    key={index}
                                    className="flex items-center text-lg"
                                >
                                    <CheckCircle className="mr-3 h-6 w-6 flex-shrink-0" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>

                </Card>

                <div className=" flex justify-center items-center">
                    <div className=" mt-4 flex items-center justify-between">
                    <AuthButton />
                    </div>
                </div>
            </div>

        </section>
    )
}
