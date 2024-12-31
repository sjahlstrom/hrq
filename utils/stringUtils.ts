import { format } from 'date-fns'

export const formatDate = (date: Date | null) => {
    if (!date) return 'Not specified'
    return format(date, 'MMMM dd, yyyy')
}

export const formatField = (field: string | null) => {
    return toTitleCase(replaceHyphens(field))
}

export const replaceHyphens = (str: string | null): string => {
    if (!str) return 'Not specified'
    return str.replace(/-/g, ' ')
}

export const toTitleCase = (str: string | null): string => {
    if (!str) return 'Not specified'
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

