import Breadcrumb from '@/components/Common/bread-crumb'
import React from 'react'
import SampleAnalysis from '@/components/(test)/Analysis/sample-analysis'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Sample Analysis",
}

const SampleAnalysisPage = () => {
    return (
        <div className="bg-green-200">
            <Breadcrumb
                pageName="Sample Analysis"
                description="This is a sample, a mini-report, based on whether you score high, medium or low, on the questions. The above questions represent only one question for each scale. The actual test has more than one question for each and measures different characters/traits than the ones here. This is only a sample report, only about a paragraph compared to the much longer report generated from the actual test. It is offered to give you a feel for what will follow, should you take the HighRQ test, which is comprehensive. According to your scores, based upon a comparison to norms, the following is likely true."
            />
            <SampleAnalysis />
        </div>
    )
}

export default SampleAnalysisPage
