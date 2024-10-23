'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import tosData from '@/components/(menu)/Tos/Data/tosData.json'

const FaqItem = ({ title, content }: { title: string; content: string }) => {
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{content}</p>
        </div>
    )
}

export default function TosPage() {
    return (
        <section
            id="tos"
            className="relative z-10 bg-slate-100 overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4">
                        <Card className="mx-auto max-w-4xl bg-white shadow-lg">
                            <CardContent className="p-8">
                                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Terms of Service</h1>
                                {tosData.sections.map((section, index) => (
                                    <div key={index}>
                                        <span
                                            className="text-xl font-bold text-center mb-8 text-gray-800">{section.title}</span>
                                        <FaqItem title={section.title} content={section.content} />
                                    </div>
                                ))}

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 z-[-1] opacity-30 lg:opacity-100">
                <svg
                    width="450"
                    height="556"
                    viewBox="0 0 450 556"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="17.9997"
                        cy="182"
                        r="18"
                        fill="url(#paint1_radial_25:217)"
                    />
                    <circle
                        cx="76.9997"
                        cy="288"
                        r="34"
                        fill="url(#paint2_radial_25:217)"
                    />
                    <circle
                        cx="325.486"
                        cy="302.87"
                        r="180"
                        transform="rotate(-37.6852 325.486 302.87)"
                        fill="url(#paint3_linear_25:217)"
                    />
                    <circle
                        opacity="0.8"
                        cx="184.521"
                        cy="315.521"
                        r="132.862"
                        transform="rotate(114.874 184.521 315.521)"
                        stroke="url(#paint4_linear_25:217)"
                    />
                    <circle
                        opacity="0.8"
                        cx="356"
                        cy="290"
                        r="179.5"
                        transform="rotate(-30 356 290)"
                        stroke="url(#paint5_linear_25:217)"
                    />
                    <circle
                        opacity="0.8"
                        cx="191.659"
                        cy="302.659"
                        r="133.362"
                        transform="rotate(133.319 191.659 302.659)"
                        fill="url(#paint6_linear_25:217)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_25:217"
                            x1="-54.5003"
                            y1="-178"
                            x2="222"
                            y2="288"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4A6CF7" />
                            <stop
                                offset="1"
                                stopColor="#4A6CF7"
                                stopOpacity="0"
                            />
                        </linearGradient>
                        <radialGradient
                            id="paint1_radial_25:217"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
                        >
                            <stop
                                offset="0.145833"
                                stopColor="#4A6CF7"
                                stopOpacity="0"
                            />
                            <stop
                                offset="1"
                                stopColor="#4A6CF7"
                                stopOpacity="0.08"
                            />
                        </radialGradient>
                        <radialGradient
                            id="paint2_radial_25:217"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
                        >
                            <stop
                                offset="0.145833"
                                stopColor="#4A6CF7"
                                stopOpacity="0"
                            />
                            <stop
                                offset="1"
                                stopColor="#4A6CF7"
                                stopOpacity="0.08"
                            />
                        </radialGradient>
                        <linearGradient
                            id="paint3_linear_25:217"
                            x1="226.775"
                            y1="-66.1548"
                            x2="292.157"
                            y2="351.421"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4A6CF7" />
                            <stop
                                offset="1"
                                stopColor="#4A6CF7"
                                stopOpacity="0"
                            />
                        </linearGradient>
                        <linearGradient
                            id="paint4_linear_25:217"
                            x1="184.521"
                            y1="182.159"
                            x2="184.521"
                            y2="448.882"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4A6CF7" />
                            <stop
                                offset="1"
                                stopColor="white"
                                stopOpacity="0"
                            />
                        </linearGradient>
                        <linearGradient
                            id="paint5_linear_25:217"
                            x1="356"
                            y1="110"
                            x2="356"
                            y2="470"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4A6CF7" />
                            <stop
                                offset="1"
                                stopColor="white"
                                stopOpacity="0"
                            />
                        </linearGradient>
                        <linearGradient
                            id="paint6_linear_25:217"
                            x1="118.524"
                            y1="29.2497"
                            x2="166.965"
                            y2="338.63"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#4A6CF7" />
                            <stop
                                offset="1"
                                stopColor="#4A6CF7"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </section>
    )
}