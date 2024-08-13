'use client'

import React, { useState, useCallback, useEffect } from 'react'
import 'rc-slider/assets/index.css'
import ReverseSlider from '@/components/Slider/ReverseSlider'
import ForwardSlider from '@/components/Slider/ForwardSlider'
import Confetti from 'react-confetti'
import { Button } from '@/components/ui/button'
import {
    clearAnswersArray,
    setTestCompleted,
    isTestCompleted,
    updateTestResponse,
    UpdateTestUserProps,
    updateSampleQuestion,
    getSampleResponseId,
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

let answers: number[] = []


const QuestionSection: React.FC<QuestionSectionProps> = ({
    questionData,
    fireworksIndex,
    questionNumber,
}) => {
    const [questionIndex, setQuestionIndex] = useState<number>(questionNumber)
    const [sliderValue, setSliderValue] = useState<number>(0)
    const [reverseSliderValue, setReverseSliderValue] = useState<number>(30)

    const isLastQuestion = questionIndex === questionData.length
    const currentQuestion = questionData[questionIndex]
    const numberOfQuestions = questionData.length

    const testMode = numberOfQuestions < 10 ? 'sample' : 'test'
    const NUMBER_OF_QUESTIONS = testMode === 'test' ? 128 : 5

    const router = useRouter()

    useEffect(() => {
        const checkAndRedirect = async () => {
            if (questionIndex === NUMBER_OF_QUESTIONS -1) {
                try {
                    await setTestCompleted(); // Assuming this is a promise-based function
                    router.push('/analysis');
                } catch (error) {
                    console.error('Error completing the test:', error);
                }
            }
        };

        checkAndRedirect();
    }, [questionIndex, NUMBER_OF_QUESTIONS, router]);


    const advanceToNextQuestion = useCallback(async () => {
        if (!isLastQuestion) {
            const testResponse: number[] = [
                currentQuestion.reverse ? reverseSliderValue : sliderValue,
            ]
            const associatedScale: number = currentQuestion.scale

            const response: UpdateTestUserProps = {
                testResponse,
                associatedScale,
            }

            if (testMode === 'test') {
                // Test questions
                await updateTestResponse(response)
            } else {

                // TODO: Add test response value to array

                const id = await getSampleResponseId()
                if (id) {
                    // if on the first question, zero out the answers array
                    if (questionIndex === 0) {
                        await clearAnswersArray(id)
                        localStorage.clear()
                    }
                    await updateSampleQuestion({ testResponse, id })
                    answers.push(...testResponse)
                    console.log("answers", answers)
console.log("questionIndex", questionIndex)
                    if (questionIndex === NUMBER_OF_QUESTIONS - 2) {
                        // length of Sample questions
                        // await updateSampleQuestion({ testResponse, id })
                        //  answers.push(...testResponse)
                        console.log("answers", answers)
                        const jsonArray = JSON.stringify(answers)
                        console.log(jsonArray)
                        localStorage.setItem('array', jsonArray);
                    }
                } else {
                    throw new Error('No SampleResponse row exists')
                }
            }

            setQuestionIndex((prev) => prev + 1)

            setSliderValue(0)

            if (questionData[questionIndex + 1]?.reverse) {
                setReverseSliderValue(30)
            }
        }
    }, [
        isLastQuestion,
        currentQuestion,
        sliderValue,
        reverseSliderValue,
        questionData,
        questionIndex,
        NUMBER_OF_QUESTIONS,
        testMode,
    ])

    const updateSliderValue = useCallback((value: number | number[]) => {
        if (typeof value === 'number') {
            setSliderValue(value)
        } else if (Array.isArray(value) && value.length > 0) {
            setSliderValue(value[0])
        }
    }, [])

    const handleReverseSliderChange = useCallback((value: number) => {
        setReverseSliderValue(value)
    }, [])

    const { left, middle, right } = currentQuestion.options
    const widthPercentage = `${(questionIndex / (fireworksIndex === 64 ? 128 : NUMBER_OF_QUESTIONS - 1)) * 100}%`

    return (
        <div className="bg-gray-700">
            <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                    className="h-1 bg-green-500"
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
                <div>{left}</div>
                <div>{middle}</div>
                <div>{right}</div>
            </div>

            <div className="flex justify-center w-full">
                <Button
                    className="px-6 -mt-2 rounded-xl shadow-md text-xl bg-blue-500 hover:bg-blue-700 w-full md:w-3/4 lg:w-2/3 py-2 md:py-4 items-center justify-center text-white mx-auto"
                    onClick={advanceToNextQuestion}
                    disabled={isLastQuestion}
                >
                    Next Question
                </Button>
            </div>
            {questionIndex === fireworksIndex && (
                <>
                    <Confetti />
                    <div
                        role="alert"
                        className="rounded-xl border border-blue-800 bg-blue-500 p-4 mt-10 text-center"
                    >
                        <strong className="block font-medium text-black">
                            {fireworksIndex === NUMBER_OF_QUESTIONS / 2
                                ? "You're halfway there!"
                                : 'End of test questions'}
                        </strong>
                    </div>
                </>
            )}
            <div>
                <br />
            </div>
        </div>
    )
}

export default QuestionSection
