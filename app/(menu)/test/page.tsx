import React from 'react'
import QuestionSection from '@/components/(menu)/Test'
import Breadcrumb from '@/components/Common/Breadcrumb'
import sampleQuestions from '@/components/(menu)/Test/Data/sampleQuestions'
import questions from '@/components/(menu)/Test/Data/questions'
import { currentUser } from '@clerk/nextjs/server'
import { getTestResponseLength } from '@/app/api/answers'

const TheTest: React.FC = async () => {
    const user = await currentUser()
    let length = 0
    if (user) {
        const userId = user.id
        const responseLength = await getTestResponseLength(userId)
        length = responseLength ?? 0
    }

    return (
        <>
            {user ? (
                <Breadcrumb
                    pageName="Test Page"
                    description="The test is designed for you to learn more than you knew about yourself, how you related to others, and how others can relate to you.  It's not a short 10 question quiz.  Take your time, think about each question.  You cannot go back and change your answers, but you can quit before finishing and restart where you left off at a later time."
                />
            ) : (
                <Breadcrumb
                    pageName="Test Page"
                    description="This is a short 4 question sample test that gives an example of the types of questons asked and the analysis of your responses."
                />
            )}
            {!user ? (
                <QuestionSection
                    questionData={sampleQuestions}
                    fireworksIndex={4}
                    questionNumber={length}
                />
            ) : (
                <QuestionSection
                    questionData={questions}
                    fireworksIndex={64} // I hate magic numbers
                    questionNumber={length}
                />
            )}
        </>
    )
}

export default TheTest
