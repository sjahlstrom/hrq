import React from 'react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
    currentPage: number
    pageCount: number
    setCurrentPage: (page: number) => void
    totalItems: number
}

export default function UsersPagination({
    currentPage,
    pageCount,
    setCurrentPage,
    totalItems,
}: PaginationProps) {
    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1)

    return (
        <nav
            className="flex flex-col items-center mt-6"
            aria-label="Pagination"
        >
            <ul className="inline-flex items-center space-x-2">
                <li>
                    <Button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="icon"
                        className="rounded-full w-[120px] bg-red-600 hover:bg-red-800 active:bg-amber-500 border border-pantone621 transition-colors duration-300"
                    >
                        <span className="sr-only">Previous</span>
                        Previous
                    </Button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <Button
                            onClick={() => setCurrentPage(number)}
                            variant={
                                currentPage === number ? 'secondary' : 'outline'
                            }
                            size="icon"
                            className="rounded-full bg-pantone624 hover:bg-pantone625 active:bg-green-800 border border-pantone624 transition-colors duration-300 mx-1"
                        >
                            {number}
                        </Button>
                    </li>
                ))}
                <li>
                    <Button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pageCount}
                        variant="outline"
                        size="icon"
                        className="rounded-full w-[120px] bg-red-600 hover:bg-red-800 active:bg-amber-500 border border-pantone621 transition-colors duration-300"
                    >
                        <span className="sr-only">Next</span>
                        Next
                    </Button>
                </li>
            </ul>
            <div className="mt-2 text-sm text-gray-700">
                Showing {Math.min((currentPage - 1) * 12 + 1, totalItems)} to{' '}
                {Math.min(currentPage * 12, totalItems)} of {totalItems} results
            </div>
        </nav>
    )
}
