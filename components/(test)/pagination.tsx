'use client'

import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    handlePageChange: (page: number) => void
}

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       handlePageChange,
                                   }: PaginationProps) {
    const [showNumbers, setShowNumbers] = useState(true)

    useEffect(() => {
        const handleResize = () => {
            setShowNumbers(window.innerWidth >= 640) // Show on screens larger than mobile (sm breakpoint)
        }

        handleResize() // Initial check
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <nav className="flex flex-col items-center mt-6" aria-label="Pagination">
            <ul className="inline-flex items-center space-x-2">
                <li>
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="icon"
                        className="rounded-full w-[120px] bg-hrqColors-skyBlue-400 hover:bg-hrqColors-skyBlue-600 active:bg-hrqColors-skyBlue-700 border border-hrqColors-skyBlue-700 transition-colors duration-300"
                    >
                        <span className="sr-only">Previous</span>
                        Previous
                    </Button>
                </li>

                {/* Page Number Buttons */}
                {showNumbers &&
                    pageNumbers.map((number) => (
                        <li key={number} className="hidden sm:block">
                            <Button
                                onClick={() => handlePageChange(number)}
                                variant="outline"
                                size="icon"
                                className={`w-10 h-10 rounded-full transition-colors duration-300 ${
                                    currentPage === number
                                        ? 'bg-blue-800 text-white hover:bg-blue-700 border-blue-800'
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
                        className="rounded-full w-[120px] bg-hrqColors-skyBlue-400 hover:bg-hrqColors-skyBlue-600 active:bg-hrqColors-skyBlue-700 border border-hrqColors-skyBlue-700 transition-colors duration-300"
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