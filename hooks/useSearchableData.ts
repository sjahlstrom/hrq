import { useState, useMemo } from 'react'

export function useSearchableData<T>(items: T[], searchKeys: (keyof T)[]) {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredItems = useMemo(() => {
        if (!searchQuery) return items

        return items.filter(item =>
            searchKeys.some(key =>
                String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
    }, [items, searchQuery, searchKeys])

    return { items: filteredItems, searchQuery, setSearchQuery }
}