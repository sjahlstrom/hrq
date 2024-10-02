import Breadcrumb from '@/components/Common/Breadcrumb'
import QuestionSection from '@/components/(test)/Test/TheTest'
import sampleQuestions from '@/components/(test)/Test/Data/sampleQuestions'
import testQuestions from '@/components/(test)/Test/Data/testQuestions'
import { currentUser } from '@clerk/nextjs/server'
import { getTestResponseLength } from '@/app/api/users'

const TheTest = async () => {
    const user = await currentUser()

    // Initialize response length to 0
    let length = 0
    if (user) {
        const userId = user.id
        const responseLength = await getTestResponseLength(userId)
        length = responseLength ?? 0
    }

    const isUserLoggedIn = Boolean(user)

    return (
        <>
            <div className="bg-brown-500">
                <Breadcrumb
                    pageName="Test Page"
                    description={
                        isUserLoggedIn
                            ? 'This test measures the qualities that make people good partners in relationships. It is not a short 10 question quiz. It is in depth, takes about 25 minutes and will generate a lengthy report, designed only for you. In it you will learn about yourself, how you relate to others, and how others relate to you. Take your time, think about each question. Read each question, and then move the slider or just click on the slider bar where you think you are, thinking only of yourself. Be honest. Think carefully. After you click on the slider, click on Next Question. Your answer will be recorded and the next question will appear. You cannot go back and change your answers, but you can quit before finishing and restart where you left off at a later time.'
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
