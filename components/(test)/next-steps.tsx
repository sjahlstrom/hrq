import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface NextStepsProps {
    totalSummedValues: number
}

const NextSteps: React.FC<NextStepsProps> = ({ totalSummedValues }) => {
    return (
        <Card>
            <CardContent className="p-6 border shadow-lg bg-custom-radial from-hrqColors-sunsetOrange-400 to-hrqColors-sunsetOrange-200">
                <h2 className="text-xl font-semibold text-gray-800">
                    Next Steps
                </h2>
                <p className="text-gray-700 mt-4">
                    Based on your analysis, we recommend reviewing the results
                    carefully and considering the following actions:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4 space-y-4">
                    <li className="font-semibold">
                        Your Total Composite Score is {totalSummedValues}
                    </li>
                    <li>Review the areas where scores were below average.</li>
                    <li>Consider additional tests to explore further.</li>
                    <li>Reach out to a professional if needed.</li>
                </ul>
            </CardContent>
        </Card>
    )
}

export default NextSteps