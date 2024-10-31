'use client'

import React, { useState, useEffect } from 'react'
import testQuestions from '@/components/(test)/Test/Data/testQuestions.json'
import { getTestResponses } from '@/app/api/users'
import scaleEnums from '@/components/(test)/Test/Data/scaleEnums'

interface Question {
    question: string
    scale: number
    position: number
    reverse: boolean
    options: {
        left: string
        middle: string
        right: string
    }
}

interface Props {
    numericParam: number
}

const QuestionPositionAnalysis: React.FC<Props> = ({ numericParam }) => {
    const [positions, setPositions] = useState<number[]>([])
    const [testResponses, setTestResponses] = useState<number[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Filter questions based on the numericParam
        const matchedPositions = testQuestions
            .filter((question: Question) => question.scale === numericParam)
            .map((question: Question) => question.position)

        setPositions(matchedPositions)

        // Fetch test responses
        const fetchTestResponses = async () => {
            try {
                const responses = await getTestResponses()
                setTestResponses(responses)
                setIsLoading(false)
                console.log(responses)
            } catch (err) {
                setError('Failed to fetch test responses')
                setIsLoading(false)
            }
        }

        fetchTestResponses()
    }, [numericParam])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="p-4 space-y-6">
            <div>
                {/*<h2 className="text-2xl font-bold mb-4">Question Positions Matching Parameter: {numericParam}</h2>*/}
                {positions.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {positions.map((position, index) => (
                            <li key={index} className="mb-2">
                                Position: {position}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No matches found</p>
                )}
            </div>
        </div>
    )
}

export default QuestionPositionAnalysis
