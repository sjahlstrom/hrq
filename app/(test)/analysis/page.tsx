import Breadcrumb from '@/components/common/bread-crumb'
import React from 'react'
import TestAnalysis from '@/components/(test)/Analysis/analysis'
import { Metadata } from 'next'
import Charts from '@/components/(test)/Analysis/Charts/charts'

export const metadata: Metadata = {
    title: 'Analysis',
}

const AnalysisPage = () => {
    return (
        <div className="bg-green-500">
            <Breadcrumb
                pageName="Analysis"
                description="This is a sample, a mini-report, based on whether you score high, medium or low, on the questions. The above questions represent only one question for each scale. The actual test has more than one question for each and measures different characters/traits than the ones here. This is only a sample report, only about a paragraph compared to the much longer report generated from the actual test. It is offered to give you a feel for what will follow, should you take the HighRQ test, which is comprehensive. According to your scores, based upon a comparison to norms, the following is likely true."
            />
            <TestAnalysis />
            <Charts numericParam={44} />
        </div>
    )
}

export default AnalysisPage
