'use client'

import React, { useState, useCallback, useEffect } from 'react'
import 'rc-slider/assets/index.css'
import ReverseSlider from '@/components/Slider/ReverseSlider'
import ForwardSlider from '@/components/Slider/ForwardSlider'
import Confetti from 'react-confetti'
import { Button } from '@/components/ui/button'
import {
    deleteUserTestResponsesAndAssociatedScales,
    setTestCompleted,
    updateTestResponse,
    UpdateTestUserProps,
} from '@/app/api/answers'
import { useRouter } from 'next/navigation'

export interface Option {
    left: string
    middle: string
    right: string
}

export interface Question {
    question: string
    options: Option
    reverse?: boolean
    scale: number
}

interface QuestionSectionProps {
    questionData: Question[]
    fireworksIndex: number
    questionNumber: number
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
    questionData,
    fireworksIndex,
    questionNumber,
}) => {
    const [questionIndex, setQuestionIndex] = useState(questionNumber)
    const [sliderValue, setSliderValue] = useState(15)
    const [reverseSliderValue, setReverseSliderValue] = useState(15)
    const [answers, setAnswers] = useState<number[]>([])
    const [isSliderUsed, setIsSliderUsed] = useState(false) // New state

    const router = useRouter()

    let currentQuestion = questionData[questionIndex]
    const isLastQuestion = questionIndex === questionData.length
    const testMode = questionData.length < 6 ? 'sample' : 'test'
    const halfwayIndex = Math.floor(questionData.length / 2)

    useEffect(() => {
        const checkAndRedirect = async () => {
            if (isLastQuestion && testMode === 'test') {
                // Perform any redirection or test completion logic here
            }
        }

        checkAndRedirect()
    }, [isLastQuestion, router, testMode])

    const handleShowAnalysis = useCallback(async () => {
        try {
            if (testMode === 'test') {
                await setTestCompleted()
            }
            router.push(`/analysis?mode=${testMode}`)
        } catch (error) {
            console.error('Error completing the test:', error)
        }
    }, [router, testMode])

    const advanceToNextQuestion = useCallback(async () => {
        if (!isLastQuestion) {
            const testResponse = currentQuestion.reverse
                ? reverseSliderValue
                : sliderValue
            const associatedScale = currentQuestion.scale
            const response: UpdateTestUserProps = {
                testResponse: [testResponse],
                associatedScale,
            }

            if (testMode === 'test') {
                await updateTestResponse(response)
            } else {
                if (questionIndex === 0) {
                    localStorage.clear()
                }

                setAnswers((prev) => {
                    const updatedAnswers = [...prev, testResponse]

                    // Write the updated array to localStorage on every question
                    localStorage.setItem(
                        'array',
                        JSON.stringify(updatedAnswers)
                    )

                    return updatedAnswers
                })
            }

            setQuestionIndex((prev) => prev + 1)
            setSliderValue(15)
            if (questionData[questionIndex + 1]?.reverse) {
                setReverseSliderValue(15)
            }

            // Reset slider interaction state
            setIsSliderUsed(false)
        }
    }, [
        isLastQuestion,
        currentQuestion,
        sliderValue,
        reverseSliderValue,
        questionData,
        questionIndex,
        testMode,
    ])

    const updateSliderValue = useCallback((value: number | number[]) => {
        setSliderValue(Array.isArray(value) ? value[0] : value)
        setIsSliderUsed(true) // Slider has been interacted with
    }, [])

    const handleReverseSliderChange = useCallback((value: number) => {
        setReverseSliderValue(value)
        setIsSliderUsed(true) // Reverse slider has been interacted with
    }, [])

    const widthPercentage = `${(questionIndex / (fireworksIndex === 64 ? 128 : questionData.length - 1)) * 100}%`

    // TODO: Remove this test
    const handleDeleteUserTestResponsesAndAssociatedScales =
        useCallback(async () => {
            await deleteUserTestResponsesAndAssociatedScales()
            setQuestionIndex(0)
            router.push(`/`)
        }, [router])

    return (
        <div className="bg-gray-700">
            <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                    className="h-1 bg-logo-green"
                    style={{ width: widthPercentage }}
                ></div>
            </div>
            <div className="bg-gray-700">
                <div className="px-4 py-4 flex w-full md:w-3/4 lg:w-2/3 items-center justify-center text-white mx-auto mb-0 md:mb-10 min-h-24">
                    <h2 className="text-base md:text-2xl font-medium text-black dark:text-white">
                        {currentQuestion.question}
                    </h2>
                </div>
            </div>
            <div className="px-8 flex w-full md:w-3/4 lg:w-2/3 items-center justify-center text-white mx-auto mb-4 md:mb-10">
                {currentQuestion.reverse ? (
                    <div className="w-full mx-auto mt-4 md:mt-5">
                        <ReverseSlider
                            value={reverseSliderValue}
                            onChange={handleReverseSliderChange}
                        />
                        <p>Current Value: {reverseSliderValue}</p>
                    </div>
                ) : (
                    <div className="w-full mt-4 mx-auto md:mt-5">
                        <ForwardSlider
                            value={sliderValue}
                            onChange={updateSliderValue}
                        />
                        <p>Current Value: {sliderValue}</p>
                    </div>
                )}
            </div>

            <div className="flex px-12 p-2 -mt-4 justify-between w-full md:w-3/4 lg:w-2/3 items-center text-black dark:text-white mx-auto mb-4 md:mb-10">
                <div>{currentQuestion.options.left}</div>
                <div>{currentQuestion.options.middle}</div>
                <div>{currentQuestion.options.right}</div>
            </div>
            <div className="flex justify-center w-full">
                {questionIndex < questionData.length - 1 ? (
                    <Button
                        className="px-6 -mt-2 rounded-xl shadow-md text-xl bg-blue-500 hover:bg-blue-700 w-full md:w-3/4 lg:w-2/3 py-2 md:py-4 items-center justify-center text-white mx-auto"
                        onClick={advanceToNextQuestion}
                        disabled={!isSliderUsed} // Disable button until slider is used
                    >
                        Next Question
                    </Button>
                ) : (
                    <Button
                        className="px-6 -mt-2 rounded-xl shadow-md text-xl bg-green-500 hover:bg-green-700 w-full md:w-3/4 lg:w-2/3 py-2 md:py-4 items-center justify-center text-white mx-auto"
                        onClick={handleShowAnalysis}
                    >
                        Show Analysis
                    </Button>
                )}

                {/*TODO: Testing only -- remove*/}
                {testMode === 'test' && (
                    <Button
                        className="px-6 -mt-2 rounded-xl shadow-md text-xl bg-blue-500 hover:bg-blue-700 w-full md:w-3/4 lg:w-2/3 py-2 md:py-4 items-center justify-center text-white mx-auto"
                        onClick={
                            handleDeleteUserTestResponsesAndAssociatedScales
                        }
                    >
                        <div>For Testing only ... Delete answers</div>
                    </Button>
                )}
            </div>

            {questionIndex === fireworksIndex && (
                <>
                    <Confetti />
                    <div
                        role="alert"
                        className="rounded-xl border border-blue-800 bg-yellow-300 p-4 mt-10 text-center"
                    >
                        <strong className="block font-medium text-black">
                            {fireworksIndex === halfwayIndex
                                ? "Congratulations!  You're halfway there!"
                                : 'End of test questions'}
                        </strong>
                    </div>
                </>
            )}
        </div>
    )
}

export default QuestionSection
