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
