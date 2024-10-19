import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonUserTable() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {['Username', 'Email', 'Role', 'Banned', 'Actions'].map((header) => (
                        <th key={header} scope="col" className="px-6 py-3">
                            <Skeleton className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {[...Array(5)].map((_, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        {[...Array(5)].map((_, cellIndex) => (
                            <td key={cellIndex} className="px-6 py-4">
                                <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}