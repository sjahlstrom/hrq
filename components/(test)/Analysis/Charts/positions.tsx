import testQuestions from '@/components/(test)/Test/Data/testQuestions.json'

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

export function findPositionsForScale(scaleNumber: number): [number, number] {
    const matchedPositions = testQuestions
        .filter((question: Question) => question.scale === scaleNumber)
        .map((question: Question) => question.position)

    if (matchedPositions.length < 2) {
        throw new Error(`Less than two positions found for scale ${scaleNumber}`)
    }

    // Filter out any NaN values
    const validPositions = matchedPositions.filter((position) => !isNaN(position))

    if (validPositions.length < 2) {
        throw new Error(`Less than two valid positions found for scale ${scaleNumber}`)
    }

    // Explicitly cast to [number, number] to satisfy TypeScript
    return [validPositions[0], validPositions[1]] as [number, number]
}


export default findPositionsForScale