import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Metadata } from 'next'

export default function About() {
    const benefits = [
        "Improve your dating life",
        "Enhance work relationships",
        "Strengthen family bonds",
        "Build lasting friendships",
        "Increase emotional intelligence",
    ]

    return (
        <section id="about" className="pt-12 sm:pt-26 md:pt-34 lg:pt-46 xl:pt-54 bg-custom-radial from-hrqColors-slateBlue-400 to-hrqColors-slateBlue-200 py-16 md:py-20 lg:py-28 min-h-screen">
            <div className="container mx-auto px-4 max-w-4xl xl:max-w-6xl">
                <h1 className="text-4xl font-bold mb-4 text-center text-deepSlate">
                    Welcome to the High Relationship Quotient (HighRQ)
                </h1>
                <p className="text-xl text-muted-foreground mb-12 text-center">
                    Discover the next evolution in measuring human potential, especially in relationships.
                </p>

                <div className="space-y-8 mb-12">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-4 text-hrqColors-slateBlue-900">What is RQ?</h2>
                            <p className="text-muted-foreground">
                                RQ, or Relationship Quotient, is a new concept similar to IQ but focused on relationships. &nbsp;It measures the qualities, traits, and skills that define your ability to maintain relationships. &nbsp;Just like IQ tests intelligence, RQ evaluates your relational strengths.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-4 text-hrqColors-slateBlue-900">Why is RQ important?</h2>
                            <p className="text-muted-foreground">
                                Our traits influence relationship success or failure, not just in dating but in all areas of life—work, family, friendships. &nbsp;A high RQ helps you build stronger, lasting connections everywhere.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-4 text-hrqColors-slateBlue-900">Why are you here?</h2>
                            <p className="text-muted-foreground">
                                You&apos;re here to discover your RQ. &nbsp;Are you relationship-ready? &nbsp;Do you have what it takes to be a high-quality partner?
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-muted">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-hrqColors-slateBlue-900">Key Benefits of Understanding Your RQ</h2>
                        <ul className="space-y-2">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="text-muted-foreground flex items-center">
                                    <span className="mr-2 text-primary">•</span>
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}