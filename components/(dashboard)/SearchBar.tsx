import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchBarProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
    return (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
                <Input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 text-gray-700 rounded focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-300 border-red-900"
                    placeholder="Search by email (case-insensitive)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <Button
                        onClick={() => setSearchQuery('')}
                        className="absolute text-red-900 right-4 top-1/2 transform -translate-y-1/2"
                    >
                        Return to User List
                    </Button>
                )}
            </div>
        </div>
    )
}