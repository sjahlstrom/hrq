import { useState, useMemo } from 'react'

export function useSortableData<T>(
    items: T[],
    config = { key: '', direction: '' as 'asc' | 'desc' }) {
    const [sortConfig, setSortConfig] = useState(config)

    const sortedItems = useMemo(() => {
        const sortableItems = [...items]
        if (sortConfig.key !== '') {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key as keyof T] < b[sortConfig.key as keyof T]) {
                    return sortConfig.direction === 'asc' ? -1 : 1
                }
                if (a[sortConfig.key as keyof T] > b[sortConfig.key as keyof T]) {
                    return sortConfig.direction === 'asc' ? 1 : -1
                }
                return 0
            })
        }
        return sortableItems
    }, [items, sortConfig])

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    return { items: sortedItems, requestSort, sortConfig }
}