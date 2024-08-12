import Breadcrumb from '@/components/Common/Breadcrumb'
import React from 'react'
import Analysis from '@/components/Analysis'

const AnalysisPage = () => {
    return (
        <div className="bg-gray-600">
            <Breadcrumb
                pageName="Analysis"
                description="Mini-report, based on whether you score high, medium or low, on the questions.   The above questions represent only one question for each trait or quality.   The actual test has more than one question for each and measures other characters than the ones here.  This is a sample report, only one page of probably ten or fifteen for the actual test report.   It is offered to give you a feel for what will follow, should you take the HighRQ test, which is much more comprehensive.
According to your scores, based upon a comparison to norms, the following is likely true.
"
            />
            <Analysis />
        </div>
    )
}

export default AnalysisPage
