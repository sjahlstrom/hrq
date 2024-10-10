'use client'

import React, { useState, useCallback, useEffect, useMemo } from 'react'
import 'rc-slider/assets/index.css'
import ReverseSlider from '@/components/Slider/ReverseSlider'
import ForwardSlider from '@/components/Slider/ForwardSlider'
import { Button } from '@/components/ui/button'
import {
    setTestCompleted,
    updateTestResponse,
    UpdateTestUserProps,
} from '@/app/api/users'
import { useRouter } from 'next/navigation'
import { nunito } from '@/app/ui/fonts'

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

interface TheTestProps {
    questionData: Question[]
    fireworksIndex: number
    questionNumber: number
}

const SliderOptions: React.FC<{ options: Option }> = ({ options }) => (
    <div className="relative w-full h-8 mt-2">
        {Object.entries(options).map(([key, value], index) => (
            <div
                key={key}
                className={`absolute transform -translate-y-1/2 text-xs sm:text-sm ${
                    index === 0
                        ? 'left-16'
                        : index === 1
                          ? 'left-1/2 -translate-x-1/2'
                          : 'right-10'
                }`}
                style={{
                    top: '50%',
                    left: index === 1 ? 'calc(50% + 10px)' : undefined,
                }}
            >
                {value}
            </div>
        ))}
    </div>
)

export default function TheTest({
    questionData = [],
    fireworksIndex = 0,
    questionNumber = 0,
}: TheTestProps) {
    const [state, setState] = useState({
        questionIndex: questionNumber,
        sliderValue: 15,
        reverseSliderValue: 15,
        answers: [] as number[],
        isSliderUsed: false,
        fadeIn: true,
        currentQuestionText: '',
        testCompleted: false,
    })

    const router = useRouter()

    const currentQuestion = useMemo(
        () =>
            questionData[state.questionIndex] || {
                question: '',
                options: { left: '', middle: '', right: '' },
                scale: 0,
            },
        [questionData, state.questionIndex]
    )

    const isLastQuestion = state.questionIndex === questionData.length - 1
    const testMode = questionData.length < 6 ? 'sample' : 'test'
    const halfwayIndex = Math.floor(questionData.length / 2)

    const widthPercentage = useMemo(() => {
        const totalQuestions = fireworksIndex === 64 ? 128 : questionData.length
        return `${((state.questionIndex + 1) / totalQuestions) * 100}%`
    }, [state.questionIndex, fireworksIndex, questionData.length])

    useEffect(() => {
        setState((prev) => ({ ...prev, fadeIn: false }))
        const fadeOutTimer = setTimeout(() => {
            setState((prev) => ({
                ...prev,
                currentQuestionText: currentQuestion.question,
                fadeIn: true,
            }))
        }, 100)
        return () => clearTimeout(fadeOutTimer)
    }, [currentQuestion])

    const handleShowAnalysis = useCallback(async () => {
        try {
            if (testMode === 'test') {
                if (!state.testCompleted) {
                    await setTestCompleted()
                    setState((prev) => ({ ...prev, testCompleted: true }))
                }
                if (state.testCompleted) {
                    router.push(`/analysis?mode=${testMode}`)
                }
            } else {
                router.push(`/sampleAnalysis?mode=${testMode}`)
            }
        } catch (error) {
            console.error('Error completing the test:', error)
        }
    }, [router, testMode, state.testCompleted])

    const advanceToNextQuestion = useCallback(async () => {
        if (!isLastQuestion) {
            const testResponse = currentQuestion.reverse
                ? state.reverseSliderValue
                : state.sliderValue
            const response: UpdateTestUserProps = {
                testResponse: [testResponse],
                associatedScale: currentQuestion.scale,
            }

            if (testMode === 'test') {
                await updateTestResponse(response)
            } else {
                if (state.questionIndex === 0) {
                    localStorage.clear()
                }
                const updatedAnswers = [...state.answers, testResponse]
                localStorage.setItem('array', JSON.stringify(updatedAnswers))
                setState((prev) => ({ ...prev, answers: updatedAnswers }))
            }

            setState((prev) => ({ ...prev, fadeIn: false }))
            setTimeout(() => {
                setState((prev) => ({
                    ...prev,
                    questionIndex: prev.questionIndex + 1,
                    sliderValue: 15,
                    reverseSliderValue: 15,
                    isSliderUsed: false,
                }))
            }, 300)
        }
    }, [isLastQuestion, currentQuestion, state, testMode])

    const updateSliderValue = useCallback(
        (value: number | number[]) => {
            const newValue = Array.isArray(value) ? value[0] : value
            setState((prev) => ({
                ...prev,
                [currentQuestion.reverse
                    ? 'reverseSliderValue'
                    : 'sliderValue']: newValue,
                isSliderUsed: true,
            }))
        },
        [currentQuestion.reverse]
    )

    if (questionData.length === 0) {
        return <div>No questions available.</div>
    }

    return (
        <div
            className="flex flex-col min-h-[calc(100vh-350
        px)] bg-hrqColors-skyBlue-700"
        >
            <div className="h-1 w-full bg-hrqColors-skyBlue-600">
                <div
                    className="h-1 bg-hrqColors-sunsetOrange-400 transition-all duration-300 ease-in-out"
                    style={{ width: widthPercentage }}
                ></div>
            </div>

            <div className="flex-grow flex flex-col justify-between items-center px-4 py-8 md:py-16">
                <div className="w-full max-w-3xl text-center mb-8 md:mb-12">
                    <h2
                        className={`
                            ${nunito.className} 
                            mt-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-100
                            transition-opacity duration-300 ease-in-out
                            ${state.fadeIn ? 'opacity-100' : 'opacity-0'}
                        `}
                    >
                        {state.currentQuestionText}
                    </h2>
                </div>

                <div className="w-full max-w-3xl mb-8 md:mb-12">
                    <div className="px-4 md:px-8">
                        {currentQuestion.reverse ? (
                            <ReverseSlider
                                value={state.reverseSliderValue}
                                onChange={updateSliderValue}
                            />
                        ) : (
                            <ForwardSlider
                                value={state.sliderValue}
                                onChange={updateSliderValue}
                            />
                        )}
                    </div>
                    <SliderOptions options={currentQuestion.options} />
                </div>

                <div className="w-full max-w-3xl flex justify-center mb-8 md:mb-12">
                    <Button
                        className={`relative w-full max-w-md px-6 py-3 text-lg sm:text-xl rounded-xl shadow-md transition-all duration-300 overflow-hidden ${
                            isLastQuestion
                                ? 'bg-hrqColors-skyBlue-500 hover:bg-hrqColors-skyBlue-800 group'
                                : !state.isSliderUsed
                                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                  : 'bg-hrqColors-skyBlue-600 text-gray-100 hover:bg-hrqColors-skyBlue-800 group'
                        }`}
                        onClick={
                            isLastQuestion
                                ? handleShowAnalysis
                                : advanceToNextQuestion
                        }
                        disabled={!isLastQuestion && !state.isSliderUsed}
                    >
                        <span
                            className={`relative z-10 ${!state.isSliderUsed && !isLastQuestion ? 'pointer-events-none' : ''}`}
                        >
                            {isLastQuestion ? 'Show Analysis' : 'Next Question'}
                        </span>
                        <span className="absolute inset-0 overflow-hidden rounded-xl">
                            <span
                                className={`absolute left-0 w-full h-full origin-center -translate-x-full rounded-full ${
                                    isLastQuestion
                                        ? 'bg-hrqColors-skyBlue-800'
                                        : 'bg-air_force_blue-300'
                                } transition-transform duration-500 ${
                                    !state.isSliderUsed && !isLastQuestion
                                        ? 'hidden'
                                        : 'group-hover:translate-x-0 group-hover:scale-150'
                                }`}
                            ></span>
                        </span>
                    </Button>
                </div>

                {state.questionIndex === fireworksIndex && (
                    <div
                        role="alert"
                        className="rounded-xl border border-blue-800 bg-amber-800 p-4 text-center w-full max-w-3xl text-base sm:text-lg"
                    >
                        <strong className="block font-medium text-white">
                            {fireworksIndex === halfwayIndex
                                ? "Congratulations! You're halfway there!"
                                : 'End of test'}
                        </strong>
                    </div>
                )}
            </div>
        </div>
    )
}
