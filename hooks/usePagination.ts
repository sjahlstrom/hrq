import { useState, useMemo } from 'react'

export function usePagination<T>(items: T[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1)

    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        return items.slice(indexOfFirstItem, indexOfLastItem)
    }, [items, currentPage, itemsPerPage])

    const pageCount = Math.ceil(items.length / itemsPerPage)

    return { currentItems, currentPage, setCurrentPage, pageCount }
}