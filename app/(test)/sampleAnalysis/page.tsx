import Breadcrumb from '@/components/common/bread-crumb'
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
                description="This is a sample, a mini-report."
            />
            <SampleAnalysis />
        </div>
    )
}

export default SampleAnalysisPage
