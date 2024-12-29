'use client'

import { useState} from 'react'
import Breadcrumb from '@/components/common/bread-crumb'
import QuestionSection from '@/components/(test)/Test/the-test'
import TermsOfService from '@/components/TermsOfService'
import sampleQuestions from '@/components/(test)/Test/Data/sampleQuestions'
import testQuestions from '@/components/(test)/Test/Data/testQuestions'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface TestPageClientProps {
    initialQuestionNumber: number
    tosAccepted: boolean
}

const TestPageClient = ({ initialQuestionNumber = 0, tosAccepted = false }: TestPageClientProps) => {
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const [showTos, setShowTos] = useState(!tosAccepted)

    const isUserLoggedIn = Boolean(user)

    const handleTosAccept = () => {
        setShowTos(false)
        router.refresh()
    }

    if (!isLoaded) {
        return null
    }

    return (
        <>
            {isUserLoggedIn && !tosAccepted && (
                <TermsOfService
                    isOpen={showTos}
                    onOpenChange={setShowTos}
                    onProceed={handleTosAccept}
                />
            )}

            <div className="bg-hrqColors-coolGray-700">
                <Breadcrumb
                    pageName="Test Page"
                    minHeight={
                        isUserLoggedIn
                            ? "min-h-[320px]"
                            : "min-h-[220px]"
                    }
                    description={
                        isUserLoggedIn
                            ? 'This test assesses qualities that make people good relationship partners. It\'s in-depth, takes about 25 minutes, and generates a personalized, detailed report. You\'ll learn about yourself, how you relate to others, and how others relate to you. Take your time and answer thoughtfully. Use the slider to select your response, then click "Next Question" to proceed. Once you answer, you can\'t go back, but you can quit and resume later.'
                            : 'This is a short 4 question sample test that gives an example of the types of questions asked and the analysis of your responses.'
                    }
                />

                <QuestionSection
                    questionData={
                        isUserLoggedIn ? testQuestions : sampleQuestions
                    }
                    fireworksIndex={isUserLoggedIn ? 64 : 4}
                    questionNumber={initialQuestionNumber}
                />
            </div>
        </>
    )
}

export default TestPageClient