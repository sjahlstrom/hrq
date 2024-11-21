import { NextRequest, NextResponse } from 'next/server'
import {
    getTestResponses,
} from '@/app/api/users'
import { TestQuestion } from '@/types/types'
import testQuestions from '@/components/(test)/Test/Data/testQuestions'
import testAnalysisData from '@/components/(test)/Analysis/Data/Constants/TestAnalysisData'
import lieScale from '@/components/(test)/Analysis/Data/Constants/LieScale'

// Add this type assertion after the imports
    const typedTestQuestions: TestQuestion[] = testQuestions;

const LIES = [38, 45, 52, 57, 69, 79, 91, 102, 109, 125]

interface Result {
    scale: number
    positions: number[]
    answers: number[]
    summedResult: number
    analysis: string
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '6', 10)

    const answers = await getTestResponses()
    const uniqueResults = evaluateResults(answers)
    const totalResults = uniqueResults.length
    const paginatedResults = uniqueResults.slice((page - 1) * limit, page * limit)

    const lieAnalysis = calculateLieValues(answers)
    const totalSummedValues = uniqueResults.reduce((sum, result) => sum + result.summedResult, 0)
    const totalLie = LIES.reduce((sum, index) => sum + (answers[index] || 0), 0)

    const chartData = uniqueResults.map(result => ({
       scale: typedTestQuestions.find(q => q.scale === result.scale)?.question || `Scale ${result.scale}`,
        score: result.summedResult,
        statement: result.analysis,
}))

    return NextResponse.json({
        uniqueResults: paginatedResults,
        totalResults,
        totalSummedValues,
        lieAnalysis,
        totalLie,
        chartData,
    })
}

function evaluateResults(answers: number[]): Result[] {
    const results: Result[] = []
    const evaluatedPositions = new Set<number>()

    testQuestions.forEach((q, i) => {
        if (q.scale !== 64 && !evaluatedPositions.has(q.position)) {
            const matches = testQuestions
                .filter(
                    (item, index) =>
                        item.scale === q.scale &&
                        index !== i &&
                        !evaluatedPositions.has(item.position)
                )
                .map((item) => item.position)

            if (matches.length > 0) {
                evaluatedPositions.add(q.position)
                matches.forEach((pos) => evaluatedPositions.add(pos))

                const positions = [q.position, ...matches]
                const answersValues = positions.map(
                    (pos) => answers[pos] || 1
                )
                const sum = answersValues.reduce(
                    (total, value) => total + value,
                    0
                )
                const result = Math.floor(sum / 2)

                const analysis = testAnalysisData.find(
                    (data) =>
                        data.scale === q.scale &&
                        result >= data.low &&
                        result <= data.high
                )?.analysis || 'No analysis available.'

                results.push({
                    scale: q.scale,
                    positions,
                    answers: answersValues,
                    summedResult: result,
                    analysis,
                })
            }
        }
    })

    return results
}

function calculateLieValues(answers: number[]): string {
    const lieValues = LIES.map((index) => answers[index] || 0)
    const totalLieValue = lieValues.reduce((acc, value) => acc + value, 0)
    const analysis =
        lieScale.find(
            (entry) =>
                totalLieValue >= entry.low && totalLieValue <= entry.high
        )?.analysis || 'No analysis available.'
    return analysis
}