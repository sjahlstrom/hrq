import Breadcrumb from '@/components/Common/bread-crumb'
import React from 'react'
import SampleReport from '@/components/(menu)/Reports/Sample/reports'

const SampleReportPage = () => {
   return (
      <>
         <Breadcrumb
            pageName="Sample Report Page"
            description="A Sample report, based on several testQuestions in each of a sample of four areas.   This is one page of probably ten or fifteen…and assumes you randomly score higher on some scales, lower on others."
         />
         <SampleReport />
      </>
   )
}

export default SampleReportPage
