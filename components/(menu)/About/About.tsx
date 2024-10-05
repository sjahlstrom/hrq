'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function AboutPage() {
   const [activeSection, setActiveSection] = useState<string | null>(null)

   const sections = [
      { title: "What is RQ?", content: "RQ, or Relationship Quotient, is a new concept similar to IQ but focused on relationships. It measures the qualities, traits, and skills that define your ability to maintain relationships. Just like IQ tests intelligence, RQ evaluates your relational strengths." },
      { title: "Why is RQ important?", content: "Our traits influence relationship success or failure, not just in dating but in all areas of life—work, family, friendships. A high RQ helps you build stronger, lasting connections everywhere." },
      { title: "Why are you here?", content: "You're here to discover your RQ. Are you relationship-ready? Do you have what it takes to be a high-quality partner?" },
   ]

   const benefits = [
      "Improve your dating life",
      "Enhance work relationships",
      "Strengthen family bonds",
      "Build lasting friendships",
      "Increase emotional intelligence",
   ]

   const toggleSection = (title: string) => {
      setActiveSection(activeSection === title ? null : title)
   }

   return (
       <section id="about" className="pt-12 sm:pt-26 md:pt-34 lg:pt-46 xl:pt-54 bg-green-300 py-16 md:py-20 lg:py-28 min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl xl:max-w-6xl">
             <h1 className="text-4xl font-bold mb-8 text-center">Welcome to the High Relationship Quotient (HighRQ)</h1>
             <p className="text-xl text-muted-foreground mb-12 text-center">
                Discover the next evolution in measuring human potential, especially in relationships.
             </p>

             <div className="space-y-8 mb-12">
                {sections.map((section) => (
                    <Card key={section.title} className="overflow-hidden">
                       <Button
                           variant="ghost"
                           className="w-full justify-between text-left text-xl font-semibold p-6"
                           onClick={() => toggleSection(section.title)}
                       >
                          {section.title}
                          {activeSection === section.title ? (
                              <ChevronUp className="h-6 w-6" />
                          ) : (
                              <ChevronDown className="h-6 w-6" />
                          )}
                       </Button>
                       {activeSection === section.title && (
                           <CardContent className="text-gray-100 pt-0 pb-6">
                              <p className="text-muted-foreground">{section.content}</p>
                           </CardContent>
                       )}
                    </Card>
                ))}
             </div>

             <Card className="bg-muted">
                <CardContent className="p-6">
                   <h2 className="text-2xl font-semibold mb-4">Key Benefits of Understanding Your RQ</h2>
                   <ul className="space-y-2">
                      {benefits.map((benefit, index) => (
                          <li key={index} className="text-muted-foreground flex items-center">
                             <span className="mr-2 text-black">•</span>
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

