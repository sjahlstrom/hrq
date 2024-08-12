import React, { ReactNode, useState } from 'react'

// Define the type for the props
interface FaqItemProps {
   question: string;
   answer: ReactNode;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false)

   const toggleAnswer = () => {
      setIsOpen(!isOpen)
   }

   return (
      <div>
         <div
            className="font-semibold mb-2 cursor-pointer"
            onClick={toggleAnswer}
         >
            <span className="ml-2">{question}</span>
         </div>
         {isOpen && (
            <div className="border-l-4 border-gray-500 pl-4 font-normal">
               <p>{answer}</p>
            </div>
         )}
      </div>
   )
}

export default FaqItem
