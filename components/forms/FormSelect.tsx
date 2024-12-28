// components/forms/FormSelect.tsx
'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Control } from 'react-hook-form'
import { ProfileFormValues } from '@/types/form'

interface FormSelectProps {
    name: keyof ProfileFormValues
    label: string
    options: readonly string[] | string[]
    control: Control<ProfileFormValues>
    description?: string
    descriptionClassName?: string // Added this property
    required?: boolean
    disabled?: boolean
    placeholder?: string
    className?: string
}

export function FormSelect({
    name,
    label,
    options,
    control,
    description,
    descriptionClassName = 'text-xs text-gray-500 mt-1', // Added default value
    required = true,
    disabled = false,
    placeholder = 'Select an option',
    className = 'rounded border-2 border-black focus:ring-black focus:border-black',
}: FormSelectProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel className="font-bold text-black">
                        {label}
                        {required && (
                            <span className="text-red-500 ml-1">*</span>
                        )}
                    </FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        value={
                            typeof field.value === 'string'
                                ? field.value
                                : undefined
                        }
                        disabled={disabled}
                    >
                        <FormControl>
                            <SelectTrigger
                                className={className}
                                aria-required={required}
                                aria-invalid={
                                    fieldState.error ? 'true' : 'false'
                                }
                            >
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border border-gray-200">
                            {options.map((option) => (
                                <SelectItem
                                    key={option}
                                    value={option
                                        .toLowerCase()
                                        .replace(/[^a-z0-9]+/g, '-')}
                                    className="hover:bg-gray-100 focus:bg-gray-100 focus:text-black cursor-pointer"
                                >
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {description && (
                        <p className={descriptionClassName}>{description}</p>
                    )}
                    <FormMessage className="text-sm text-red-800" />
                </FormItem>
            )}
        />
    )
}
