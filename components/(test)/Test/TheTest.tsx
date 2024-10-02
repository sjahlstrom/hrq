
'use client'

import React, { useState, useCallback, useEffect, useMemo } from 'react'
import 'rc-slider/assets/index.css'
import ReverseSlider from '@/components/Slider/ReverseSlider'
import ForwardSlider from '@/components/Slider/ForwardSlider'
import { Button } from '@/components/ui/button'
import {
    deleteUserTestResponsesAndAssociatedScales,
    setTestCompleted,
    updateTestResponse,
    UpdateTestUserProps,
} from '@/app/api/users'
import { useRouter } from 'next/navigation'
import { nunito } from '@/app/ui/fonts'
import Footer from '@/components/Footer/Footer'

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

const SliderOptions: React.FC<{ options: Option }> = ({ options }) => (
    <div className="flex justify-between items-center text-brown-200 mt-2 px-8">
        {Object.entries(options).map(([key, value], index) => (
            <div
                key={key}
                className={`flex-1 ${index === 1 ? 'text-center -ml-4' : index === 2 ? 'text-right' : 'ml-10'} text-xs sm:text-sm md:text-base truncate ${index === 1 ? 'px-2' : ''}`}
            >
                {value}
            </div>
        ))}
    </div>
)

export default function QuestionSection({
    questionData = [],
    fireworksIndex = 0,
    questionNumber = 0,
}: QuestionSectionProps) {
    const [questionIndex, setQuestionIndex] = useState(questionNumber)
    const [sliderValue, setSliderValue] = useState(15)
    const [reverseSliderValue, setReverseSliderValue] = useState(15)
    const [answers, setAnswers] = useState<number[]>([])
    const [isSliderUsed, setIsSliderUsed] = useState(false)
    const router = useRouter()

    const currentQuestion = useMemo(() => {
        return questionData[questionIndex] || {
            question: '',
            options: { left: '', middle: '', right: '' },
            scale: 0,
        }
    }, [questionData, questionIndex])

    const isLastQuestion = questionIndex === questionData.length - 1
    const testMode = questionData.length < 6 ? 'sample' : 'test'
    const halfwayIndex = Math.floor(questionData.length / 2)

    useEffect(() => {
        if (isLastQuestion && testMode === 'test') {
            // Perform any redirection or test completion logic here
        }
    }, [isLastQuestion, testMode])

    const handleShowAnalysis = useCallback(async () => {
        try {
            if (testMode === 'test') {
                await setTestCompleted()
                router.push(`/analysis?mode=${testMode}`)
            }
            else {
                router.push(`/sampleAnalysis?mode=${testMode}`)
            }
        } catch (error) {
            console.error('Error completing the test:', error)
        }
    }, [router, testMode])

    const advanceToNextQuestion = useCallback(async () => {
        if (!isLastQuestion) {
            const testResponse = currentQuestion.reverse
                ? reverseSliderValue
                : sliderValue
            const response: UpdateTestUserProps = {
                testResponse: [testResponse],
                associatedScale: currentQuestion.scale,
            }

            if (testMode === 'test') {
                await updateTestResponse(response)
            } else {
                if (questionIndex === 0) {
                    localStorage.clear()
                }
                setAnswers((prev) => {
                    const updatedAnswers = [...prev, testResponse]
                    localStorage.setItem(
                        'array',
                        JSON.stringify(updatedAnswers)
                    )
                    return updatedAnswers
                })
            }

            setQuestionIndex((prev) => prev + 1)
            setSliderValue(15)
            setReverseSliderValue(15)
            setIsSliderUsed(false)
        }
    }, [
        isLastQuestion,
        currentQuestion,
        sliderValue,
        reverseSliderValue,
        questionIndex,
        testMode,
    ])

    const updateSliderValue = useCallback(
        (value: number | number[]) => {
            const newValue = Array.isArray(value) ? value[0] : value
            if (currentQuestion.reverse) {
                setReverseSliderValue(newValue)
            } else {
                setSliderValue(newValue)
            }
            setIsSliderUsed(true)
        },
        [currentQuestion.reverse]
    )

    const widthPercentage = `${(questionIndex / (fireworksIndex === 64 ? 128 : questionData.length - 1)) * 100}%`

    if (questionData.length === 0) {
        return <div>No questions available.</div>
    }

    return (
        <div className=" mt-10 bg-brown-800">
            <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                    className="h-1 bg-logo-green"
                    style={{ width: widthPercentage }}
                ></div>
            </div>

            <div className="px-4 py-4 flex w-full md:w-3/4 lg:w-2/3 items-center justify-center text-white mx-auto mb-0 md:mb-10 min-h-24">
                <h2
                    className={`${nunito.className} text-base md:text-2xl font-medium text-black dark:text-third`}
                >
                    {currentQuestion.question}
                </h2>
            </div>

            <div className="w-full md:w-3/4 lg:w-2/3 mx-auto mb-4 md:mb-10">
                <div className="px-8">
                    {currentQuestion.reverse ? (
                        <ReverseSlider
                            value={reverseSliderValue}
                            onChange={updateSliderValue}
                        />
                    ) : (
                        <ForwardSlider
                            value={sliderValue}
                            onChange={updateSliderValue}
                        />
                    )}
                </div>
                <div className="mt-4">
                    <SliderOptions options={currentQuestion.options} />
                </div>
            </div>

            <div className="flex justify-center w-full">
                <Button
                    className={`mb-8 relative w-[400px] px-6 py-2 rounded-xl shadow-md text-xl transition-all duration-300 overflow-hidden ${
                        isLastQuestion
                            ? 'bg-[#517C67] hover:bg-[#1E5545] group'
                            : !isSliderUsed
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-brown-500 text-white hover:bg-[#4F7164] group'
                    }`}
                    onClick={
                        isLastQuestion
                            ? handleShowAnalysis
                            : advanceToNextQuestion
                    }
                    disabled={!isLastQuestion && !isSliderUsed}
                >
                    <span
                        className={`relative z-10 ${!isSliderUsed && !isLastQuestion ? 'pointer-events-none' : ''}`}
                    >
                        {isLastQuestion ? 'Show Analysis' : 'Next Question'}
                    </span>
                    <span className="absolute inset-0 overflow-hidden rounded-xl">
                        <span
                            className={`absolute left-0 w-full h-full origin-center -translate-x-full rounded-full ${
                                isLastQuestion ? 'bg-[#1E5545]' : 'bg-brown-400'
                            } transition-transform duration-500 ${
                                !isSliderUsed && !isLastQuestion
                                    ? 'hidden'
                                    : 'group-hover:translate-x-0 group-hover:scale-150'
                            }`}
                        ></span>
                    </span>
                </Button>
            </div>

            {questionIndex === fireworksIndex && (
                <div
                    role="alert"
                    className="rounded-xl border border-blue-800 bg-amber-800 p-4 mt-10 text-center"
                >
                    <strong className="block font-medium text-black">
                        {fireworksIndex === halfwayIndex
                            ? "Congratulations! You're halfway there!"
                            : 'End of test'}
                    </strong>
                </div>
            )}
        </div>

    )
}
