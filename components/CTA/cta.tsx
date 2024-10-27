import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
    return (
        <section className="bg-primary py-8 ">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                        Ready to Improve Your Relationships?
                    </h1>
                    <h1>
                        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
                            Discover your High Relationship Quotient and learn how to enhance all aspects of your
                            personal and professional interactions.
                </p>
                    </h1>
                <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/signup">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded">
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}