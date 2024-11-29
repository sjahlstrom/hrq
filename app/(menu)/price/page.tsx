'use client'

import Breadcrumb from '@/components/common/bread-crumb'
import React from 'react'
import PriceCard from '@/components/(menu)/Pricing/price-card'

const PricingPage = () => {
    return (
        <div className="min-h-screen bg-custom-radial from-hrqColors-skyBlue-400 to-hrqColors-skyBlue-800 ">
                <Breadcrumb
                    pageName="Pricing Page"
                    description="Get access to your comprehensive test analysis and personalized improvement suggestions."
                />

                <div >
                    <PriceCard />
                </div>

                <div className=" text-center">
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Access your results instantly after purchase. Our platform provides
                        secure, reliable access to your test analysis and improvement
                        suggestions whenever you need them.
                    </p>
                </div>
            </div>
    )
}

export default PricingPage