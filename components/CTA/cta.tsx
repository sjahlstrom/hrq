import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export  function CTA() {
    return (
        <section className="  bg-gradient-to-br from-hrqColors-skyBlue-500 to-hrqColors-skyBlue-100 py-8 ">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                        Ready to Improve Your Relationships?
                    </h2>
                    <h1>
                        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl text-dark/60">
                            Discover your High Relationship Quotient and learn how to enhance all aspects of your
                            personal and professional interactions.
                </p>
                    </h1>
                <div className="flex flex-col sm:flex-row gap-4 text-dark">
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/signup">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    <div>
                        <Button asChild size="lg" variant="outline" className="rounded text-dark">
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA