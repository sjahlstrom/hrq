'use client'

import React, { useState, useCallback, useEffect } from 'react'
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
    const [answers, setAnswers] = useState<number[]>([]) // Define the setAnswers state
    const [isSliderUsed, setIsSliderUsed] = useState(false)
    const router = useRouter()

    const currentQuestion = questionData[questionIndex]
    const isLastQuestion = questionIndex === questionData.length - 1
    console.log ("questionData.length", questionData.length)
    const testMode = questionData.length < 6 ? 'sample' : 'test'
    const halfwayIndex = Math.floor(questionData.length / 2)

    useEffect(() => {
        const checkAndRedirect = async () => {
            if (isLastQuestion && testMode === 'test') {
                // Perform any redirection or test completion logic here
            }
        }
        checkAndRedirect()
    }, [isLastQuestion, testMode])

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
            if (questionData[questionIndex + 1]?.reverse) {
                setReverseSliderValue(15)
            }
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
        setIsSliderUsed(true)
    }, [])

    const handleReverseSliderChange = useCallback((value: number) => {
        setReverseSliderValue(value)
        setIsSliderUsed(true)
    }, [])

    const widthPercentage = `${(questionIndex / (fireworksIndex === 64 ? 128 : questionData.length - 1)) * 100}%`

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

            <div
                className="px-4 py-4 flex w-full md:w-3/4 lg:w-2/3 items-center justify-center text-white mx-auto mb-0 md:mb-10 min-h-24">
                <h2 className="text-base md:text-2xl font-medium text-black dark:text-white">
                    {currentQuestion.question}
                </h2>
            </div>

            <div
                className="px-8 flex w-full md:w-3/4 lg:w-2/3 items-center justify-center text-white mx-auto mb-4 md:mb-10">
                {currentQuestion.reverse ? (
                    <div className="w-full mx-auto mt-4 md:mt-5">
                        <ReverseSlider
                            value={reverseSliderValue}
                            onChange={handleReverseSliderChange}
                        />
                        {/*<p>Current Value: {reverseSliderValue}</p>*/}
                    </div>
                ) : (
                    <div className="w-full mt-4 mx-auto md:mt-5">
                        <ForwardSlider
                            value={sliderValue}
                            onChange={updateSliderValue}
                        />
                        {/*<p>Current Value: {sliderValue}</p>*/}
                    </div>
                )}
            </div>

            <div
                className="flex flex-col md:flex-row px-12 py-2 -mt-4 justify-between w-full md:w-[80%] lg:w-[80%] items-center text-black dark:text-white mx-auto mb-4 md:mb-10 gap-4 translate-x-2.5">
                <div className="flex-1 text-center">{currentQuestion.options.left}</div>
                <div className="flex-1 text-center">{currentQuestion.options.middle}</div>
                <div className="flex-1 text-center">{currentQuestion.options.right}</div>
            </div>


            <div className="flex justify-center w-full">
                {isLastQuestion ? (
                    <Button
                        className="relative w-full px-6 py-2 rounded-xl shadow-md text-xl transition-all duration-300 overflow-hidden bg-[#517C67] hover:bg-[#1E5545] group"
                        onClick={handleShowAnalysis}
                    >
                        <span className="relative z-10">Show Analysis</span>
                        <span className="absolute inset-0 overflow-hidden rounded-xl">
                            <span
                                className="absolute left-0 w-full h-full origin-center -translate-x-full rounded-full bg-[#1E5545] transition-transform duration-500 group-hover:translate-x-0 group-hover:scale-150"></span>
                        </span>
                    </Button>
                ) : (
                    <Button
                        className={`mb-8 relative w-[400px] px-6 py-2 rounded-xl shadow-md text-xl transition-all duration-300 overflow-hidden ${
                            !isSliderUsed
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-logo-green text-white hover:bg-[#4F7164] group'
                        }`}
                        onClick={advanceToNextQuestion}
                        disabled={!isSliderUsed}
                    >
                        <span
                            className={`relative z-10 ${!isSliderUsed ? 'pointer-events-none' : ''}`}
                        >
                            Next Question
                        </span>

                        <span className="absolute inset-0 overflow-hidden rounded-xl">
                            <span
                                className={`absolute left-0 w-full h-full origin-center -translate-x-full rounded-full bg-[#4F7164] transition-transform duration-500 ${
                                    !isSliderUsed
                                        ? 'hidden'
                                        : 'group-hover:translate-x-0 group-hover:scale-150'
                                }`}
                            ></span>
                        </span>
                    </Button>
                )}
            </div>

            {/*{testMode === 'test' && (*/}
            {/*    <div className="flex justify-center mt-6">*/}
            {/*        <Button*/}
            {/*            className="px-6 py-2 rounded-xl shadow-md text-xl bg-blue-500 hover:bg-blue-700"*/}
            {/*            onClick={*/}
            {/*                handleDeleteUserTestResponsesAndAssociatedScales*/}
            {/*            }*/}
            {/*        >*/}
            {/*            Delete answers (Testing only)*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*)}*/}

            {questionIndex === fireworksIndex && (
                <>
                    {/*<Confetti />*/}
                    <div
                        role="alert"
                        className="rounded-xl border border-blue-800 bg-yellow-300 p-4 mt-10 text-center"
                    >
                        <strong className="block font-medium text-black">
                            {fireworksIndex === halfwayIndex
                                ? "Congratulations! You're halfway there!"
                                : 'End of test'}
                        </strong>
                    </div>
                </>
            )}
        </div>
    )
}

export default QuestionSection

// 'use client'
//
// import React, { useState, useCallback, useEffect } from 'react'
// import 'rc-slider/assets/index.css'
// import ReverseSlider from '@/components/Slider/ReverseSlider'
// import ForwardSlider from '@/components/Slider/ForwardSlider'
// import { Button } from '@/components/ui/button'
// import {
//     deleteUserTestResponsesAndAssociatedScales,
//     setTestCompleted,
//     updateTestResponse,
//     UpdateTestUserProps,
// } from '@/app/api/users'
// import { useRouter } from 'next/navigation'
//
// export interface Option {
//     left: string
//     middle: string
//     right: string
// }
//
// export interface Question {
//     question: string
//     options: Option
//     reverse?: boolean
//     scale: number
// }
//
// interface QuestionSectionProps {
//     questionData: Question[]
//     fireworksIndex: number
//     questionNumber: number
// }
//
// const QuestionSection: React.FC<QuestionSectionProps> = ({
//     questionData,
//     fireworksIndex,
//     questionNumber,
// }) => {
//     const [questionIndex, setQuestionIndex] = useState(questionNumber)
//     const [sliderValue, setSliderValue] = useState(15)
//     const [reverseSliderValue, setReverseSliderValue] = useState(15)
//     const [answers, setAnswers] = useState<number[]>([])
//     const [isSliderUsed, setIsSliderUsed] = useState(false)
//     const router = useRouter()
//
//     const currentQuestion = questionData[questionIndex]
//     const isLastQuestion = questionIndex === questionData.length - 1
//     const testMode = questionData.length < 6 ? 'sample' : 'test'
//     const halfwayIndex = Math.floor(questionData.length / 2)
//
//     useEffect(() => {
//         const checkAndRedirect = async () => {
//             if (isLastQuestion && testMode === 'test') {
//                 // Perform any redirection or test completion logic here
//             }
//         }
//         checkAndRedirect()
//     }, [isLastQuestion, testMode])
//
//     const handleShowAnalysis = useCallback(async () => {
//         try {
//             if (testMode === 'test') {
//                 await setTestCompleted()
//             }
//             router.push(`/analysis?mode=${testMode}`)
//         } catch (error) {
//             console.error('Error completing the test:', error)
//         }
//     }, [router, testMode])
//
//     const advanceToNextQuestion = useCallback(async () => {
//         if (!isLastQuestion) {
//             const testResponse = currentQuestion.reverse
//                 ? reverseSliderValue
//                 : sliderValue
//             const response: UpdateTestUserProps = {
//                 testResponse: [testResponse],
//                 associatedScale: currentQuestion.scale,
//             }
//
//             if (testMode === 'test') {
//                 await updateTestResponse(response)
//             } else {
//                 if (questionIndex === 0) {
//                     localStorage.clear()
//                 }
//
//                 setAnswers((prev) => {
//                     const updatedAnswers = [...prev, testResponse]
//                     localStorage.setItem(
//                         'array',
//                         JSON.stringify(updatedAnswers)
//                     )
//                     return updatedAnswers
//                 })
//             }
//
//             setQuestionIndex((prev) => prev + 1)
//             setSliderValue(15)
//             if (questionData[questionIndex + 1]?.reverse) {
//                 setReverseSliderValue(15)
//             }
//             setIsSliderUsed(false)
//         }
//     }, [
//         isLastQuestion,
//         currentQuestion,
//         sliderValue,
//         reverseSliderValue,
//         questionData,
//         questionIndex,
//         testMode,
//     ])
//
//     const updateSliderValue = useCallback((value: number | number[]) => {
//         setSliderValue(Array.isArray(value) ? value[0] : value)
//         setIsSliderUsed(true)
//     }, [])
//
//     const handleReverseSliderChange = useCallback((value: number) => {
//         setReverseSliderValue(value)
//         setIsSliderUsed(true)
//     }, [])
//
//     const widthPercentage = `${(questionIndex / (fireworksIndex === 64 ? 128 : questionData.length - 1)) * 100}%`
//
//     const handleDeleteUserTestResponsesAndAssociatedScales =
//         useCallback(async () => {
//             if (testMode === 'test') {
//                 await deleteUserTestResponsesAndAssociatedScales()
//                 setQuestionIndex(0)
//                 router.push(`/`)
//             } else {
//                 setQuestionIndex(0)
//                 localStorage.clear() // Clear sample mode answers
//                 router.push(`/`)
//             }
//         }, [router, testMode])
//
//     return (
//         <div className="bg-gray-700">
//             <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
//                 <div
//                     className="h-1 bg-logo-green"
//                     style={{ width: widthPercentage }}
//                 ></div>
//             </div>
//
//             <div className="px-4 py-4 flex w-full md:w-3/4 lg:w-2/3 items-center justify-center text-white mx-auto mb-0 md:mb-10 min-h-24">
//                 <h2 className="text-base md:text-2xl font-medium text-black dark:text-white">
//                     {currentQuestion.question}
//                 </h2>
//             </div>
//
//             <div className="px-8 flex w-full md:w-3/4 lg:w-2/3 items-center justify-center text-white mx-auto mb-4 md:mb-10">
//                 {currentQuestion.reverse ? (
//                     <div className="w-full mx-auto mt-4 md:mt-5">
//                         <ReverseSlider
//                             value={reverseSliderValue}
//                             onChange={handleReverseSliderChange}
//                         />
//                     </div>
//                 ) : (
//                     <div className="w-full mt-4 mx-auto md:mt-5">
//                         <ForwardSlider
//                             value={sliderValue}
//                             onChange={updateSliderValue}
//                         />
//                     </div>
//                 )}
//             </div>
//
//             <div className="flex flex-col md:flex-row px-12 py-2 -mt-4 justify-between w-full md:w-[80%] lg:w-[80%] items-center text-black dark:text-white mx-auto mb-4 md:mb-10 gap-4 translate-x-2.5">
//                 <div className="flex-1 text-center">
//                     {currentQuestion.options.left}
//                 </div>
//                 <div className="flex-1 text-center">
//                     {currentQuestion.options.middle}
//                 </div>
//                 <div className="flex-1 text-center">
//                     {currentQuestion.options.right}
//                 </div>
//             </div>
//
//             <div className="flex justify-center w-full">
//                 {isLastQuestion ? (
//                     <Button
//                         className="relative w-full px-6 py-2 rounded-xl shadow-md text-xl transition-all duration-300 overflow-hidden bg-[#517C67] hover:bg-[#1E5545] group"
//                         onClick={handleShowAnalysis}
//                     >
//                         <span className="relative z-10">Show Analysis</span>
//                         <span className="absolute inset-0 overflow-hidden rounded-xl">
//                             <span className="absolute left-0 w-full h-full origin-center -translate-x-full rounded-full bg-[#1E5545] transition-transform duration-500 group-hover:translate-x-0 group-hover:scale-150"></span>
//                         </span>
//                     </Button>
//                 ) : (
//                     <Button
//                         className={`mb-8 relative w-[400px] px-6 py-2 rounded-xl shadow-md text-xl transition-all duration-300 overflow-hidden ${
//                             !isSliderUsed
//                                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                 : 'bg-logo-green text-white hover:bg-[#4F7164] group'
//                         }`}
//                         onClick={advanceToNextQuestion}
//                         disabled={!isSliderUsed}
//                     >
//                         <span
//                             className={`relative z-10 ${!isSliderUsed ? 'pointer-events-none' : ''}`}
//                         >
//                             Next Question
//                         </span>
//
//                         <span className="absolute inset-0 overflow-hidden rounded-xl">
//                             <span
//                                 className={`absolute left-0 w-full h-full origin-center -translate-x-full rounded-full bg-[#4F7164] transition-transform duration-500 ${
//                                     !isSliderUsed
//                                         ? 'hidden'
//                                         : 'group-hover:translate-x-0 group-hover:scale-150'
//                                 }`}
//                             ></span>
//                         </span>
//                     </Button>
//                 )}
//             </div>
//
//             {questionIndex === fireworksIndex && (
//                 <>
//                     <div
//                         role="alert"
//                         className="rounded-xl border border-blue-800 bg-yellow-300 p-4 mt-10 text-center"
//                     >
//                         <strong className="block font-medium text-black">
//                             {fireworksIndex === halfwayIndex
//                                 ? "Congratulations! You're halfway there!"
//                                 : 'End of test'}
//                         </strong>
//                     </div>
//                 </>
//             )}
//         </div>
//     )
// }
//
// export default QuestionSection
