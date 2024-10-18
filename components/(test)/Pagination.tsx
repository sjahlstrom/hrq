// 'use client'
//
// import { Button } from '@/components/ui/button'
// import React, { useState, useEffect } from 'react'
//
// interface PaginationProps {
//     currentPage: number
//     totalPages: number
//     handlePageChange: (page: number) => void
// }
//
// const Pagination: React.FC<PaginationProps> = ({
//     currentPage,
//     totalPages,
//     handlePageChange,
// }) => {
//     const [showNumbers, setShowNumbers] = useState(true)
//
//     useEffect(() => {
//         const handleResize = () => {
//             setShowNumbers(window.innerWidth > 1080)
//         }
//
//         handleResize() // Initial check
//         window.addEventListener('resize', handleResize)
//
//         return () => {
//             window.removeEventListener('resize', handleResize)
//         }
//     }, [])
//
//     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
//
//     return (
//         <nav
//             className="flex flex-col items-center mt-6"
//             aria-label="Pagination"
//         >
//             <ul className="inline-flex items-center space-x-2">
//                 <li>
//                     <Button
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         variant="outline"
//                         size="icon"
//                         className="rounded-full w-[120px] bg-hrqColors-skyBlue-400 hover:bg-hrqColors-skyBlue-600 active:bg-hrqColors-skyBlue-700 border border-hrqColors-skyBlue-700 transition-colors duration-300"
//                     >
//                         <span className="sr-only">Previous</span>
//                         Previous
//                     </Button>
//                 </li>
//
//                 {/* Page Number Buttons */}
//                 {showNumbers &&
//                     pageNumbers.map((number) => (
//                         <li key={number} className="hidden xl:block">
//                             <Button
//                                 onClick={() => handlePageChange(number)}
//                                 variant={
//                                     currentPage === number
//                                         ? 'secondary'
//                                         : 'outline'
//                                 }
//                                 size="icon"
//                                 className="rounded-full bg-hrqColors-skyBlue-400 hover:bg-hrqColors-skyBlue-600 active:bg-hrqColors-skyBlue-700 border border-hrqColors-skyBlue-700 transition-colors duration-300 mx-1"
//                             >
//                                 {number}
//                             </Button>
//                         </li>
//                     ))}
//
//                 {/* Next Button */}
//                 <li>
//                     <Button
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         variant="outline"
//                         size="icon"
//                         className="rounded-full w-[120px] bg-hrqColors-skyBlue-400 hover:bg-hrqColors-skyBlue-600 active:bg-hrqColors-skyBlue-700 border border-hrqColors-skyBlue-700 transition-colors duration-300"
//                     >
//                         <span className="sr-only">Next</span>
//                         Next
//                     </Button>
//                 </li>
//             </ul>
//
//             {/* Page X of X Text */}
//             <div className="mt-2 text-sm text-gray-700">
//                 Page {currentPage} of {totalPages}
//             </div>
//         </nav>
//     )
// }
//
// export default Pagination

'use client'

import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    handlePageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   handlePageChange,
                                               }) => {
    const [showNumbers, setShowNumbers] = useState(true)

    useEffect(() => {
        const handleResize = () => {
            setShowNumbers(window.innerWidth > 1080)
        }

        handleResize() // Initial check
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    const isLastPage = currentPage === totalPages

    return (
        <nav
            className="flex flex-col items-center mt-6"
            aria-label="Pagination"
        >
            <ul className="inline-flex items-center space-x-2">
                <li>
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || isLastPage}
                        variant="outline"
                        size="icon"
                        className={`rounded-full w-[120px] transition-colors duration-300 ${
                            isLastPage
                                ? 'bg-gray-300 border-gray-400 cursor-not-allowed text-gray-500'
                                : 'bg-hrqColors-skyBlue-400 hover:bg-hrqColors-skyBlue-600 active:bg-hrqColors-skyBlue-700 border-hrqColors-skyBlue-700'
                        }`}
                    >
                        <span className="sr-only">Previous</span>
                        Previous
                    </Button>
                </li>

                {/* Page Number Buttons */}
                {showNumbers &&
                    pageNumbers.map((number) => (
                        <li key={number} className="hidden xl:block">
                            <Button
                                onClick={() => handlePageChange(number)}
                                disabled={isLastPage}
                                variant="outline"
                                size="icon"
                                className={`rounded-full border transition-colors duration-300 mx-1 ${
                                    isLastPage
                                        ? 'bg-gray-300 border-gray-400 cursor-not-allowed text-gray-500'
                                        : currentPage === number
                                            ? 'bg-blue-800 text-white hover:bg-blue-900 border-blue-900'
                                            : 'bg-hrqColors-skyBlue-400 hover:bg-hrqColors-skyBlue-600 active:bg-hrqColors-skyBlue-700 border-hrqColors-skyBlue-700'
                                }`}
                            >
                                {number}
                            </Button>
                        </li>
                    ))}

                {/* Next Button */}
                <li>
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="icon"
                        className={`rounded-full w-[120px] transition-colors duration-300 ${
                            isLastPage
                                ? 'bg-gray-300 border-gray-400 cursor-not-allowed text-gray-500'
                                : 'bg-hrqColors-skyBlue-400 hover:bg-hrqColors-skyBlue-600 active:bg-hrqColors-skyBlue-700 border-hrqColors-skyBlue-700'
                        }`}
                    >
                        <span className="sr-only">Next</span>
                        Next
                    </Button>
                </li>
            </ul>

            {/* Page X of X Text */}
            <div className="mt-2 text-sm text-gray-700">
                Page {currentPage} of {totalPages}
            </div>
        </nav>
    )
}

export default Pagination