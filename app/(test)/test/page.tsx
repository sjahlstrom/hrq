import Breadcrumb from '@/components/Common/Breadcrumb'
import QuestionSection from '@/components/(test)/Test/TheTest'
import sampleQuestions from '@/components/(test)/Test/Data/sampleQuestions'
import testQuestions from '@/components/(test)/Test/Data/testQuestions'
import { currentUser } from '@clerk/nextjs/server'
import { getTestResponseLength } from '@/app/api/users'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: "Test Page",
}

const TheTest = async () => {
    const user = await currentUser()

    let length = 0
    if (user) {
        const userId = user.id
        const responseLength = await getTestResponseLength(userId)
        length = responseLength ?? 0
    }

    const isUserLoggedIn = Boolean(user)

    return (
        <>
            <div className="bg-hrqColors-coolGray-700 ">
                <Breadcrumb
                    pageName="Test Page"
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
                    questionNumber={length}
                />
            </div>
        </>
    )
}

export default TheTest
