// components/forms/FormInput.tsx
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control } from 'react-hook-form'
import { ProfileFormValues } from '@/types/form'

interface FormInputProps {
    name: keyof ProfileFormValues
    label: string
    control: Control<ProfileFormValues>
    maxLength?: number
    type?: 'text' | 'email' | 'tel' | 'number'
    placeholder?: string
    description?: string
    required?: boolean
    disabled?: boolean
}

export function FormInput({
    name,
    label,
    control,
    maxLength,
    type = 'text',
    placeholder,
    description,
    required = true,
    disabled = false,
}: FormInputProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-bold text-black">
                        {label}
                        {required && (
                            <span className="text-red-500 ml-1">*</span>
                        )}
                    </FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            type={type}
                            value={field.value as string}
                            className="rounded border-2 border-black focus:ring-black focus:border-black"
                            maxLength={maxLength}
                            placeholder={placeholder}
                            disabled={disabled}
                            aria-required={required}
                        />
                    </FormControl>
                    {description && (
                        <p className="text-xs text-gray-500 mt-1">
                            {description}
                        </p>
                    )}
                    <FormMessage className="text-sm text-red-500" />
                </FormItem>
            )}
        />
    )
}
