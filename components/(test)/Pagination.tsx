// import { Button } from '@/components/ui/button'
// import React from 'react'
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
//     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
//
//     return (
//         <nav
//             className="flex flex-col items-center mt-6"
//             aria-label="Pagination"
//         >
//             <ul className="inline-flex items-center space-x-2">
//                 {/*Previous button*/}
//                 <li>
//                     <Button
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         variant="outline"
//                         size="icon"
//                         className="rounded-full w-[120px] bg-pantone624 hover:bg-pantone625 active:bg-green-800 border border-pantone621 transition-colors duration-300"
//                     >
//                         <span className="sr-only">Previous</span>
//                         Previous
//                     </Button>
//                 </li>
//
//                 {/* Page Number Buttons */}
//                 {pageNumbers.map((number) => (
//                     <li key={number}>
//                         <Button
//                             onClick={() => handlePageChange(number)}
//                             variant={
//                                 currentPage === number ? 'secondary' : 'outline'
//                             }
//                             size="icon"
//                             className="rounded-full bg-pantone624 hover:bg-pantone625 active:bg-green-800 border border-pantone624 transition-colors duration-300 mx-1"
//                         >
//                             {number}
//                         </Button>
//                     </li>
//                 ))}
//
//                 {/* Next Button */}
//                 <li>
//                     <Button
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         variant="outline"
//                         size="icon"
//                         className="rounded-full w-[120px] bg-pantone624 hover:bg-pantone625 border border-pantone621 transition-colors duration-300"
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

    return (
        <nav
            className="flex flex-col items-center mt-6"
            aria-label="Pagination"
        >
            <ul className="inline-flex items-center space-x-2">
                {/*Previous button*/}
                <li>
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="icon"
                        className="rounded-full w-[120px] bg-hrqColors-slateBlue-400 hover:bg-hrqColors-slateBlue-600 active:bg-green-800 border border-pantone621 transition-colors duration-300"
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
                                variant={
                                    currentPage === number
                                        ? 'secondary'
                                        : 'outline'
                                }
                                size="icon"
                                className="rounded-full bg-hrqColors-slateBlue-300 hover:bg-hrqColors-slateBlue-600 active:bg-hrqColors-slateBlue-800 border border-pantone624 transition-colors duration-300 mx-1"
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
                        className="rounded-full w-[120px] bg-hrqColors-slateBlue-400 hover:bg-hrqColors-slateBlue-600 border border-pantone621 transition-colors duration-300"
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
