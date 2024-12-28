import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Control } from 'react-hook-form'
import { ProfileFormValues } from '@/types/form'

interface BirthdayFieldProps {
    control: Control<ProfileFormValues>
}

export function BirthdayField({ control }: BirthdayFieldProps) {
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

    const years = Array.from(
        { length: new Date().getFullYear() - 1900 + 1 },
        (_, i) => new Date().getFullYear() - i
    )

    const handleMonthChange = (increment: boolean) => {
        const newMonth = new Date(currentMonth)
        newMonth.setMonth(newMonth.getMonth() + (increment ? 1 : -1))
        setCurrentMonth(newMonth)
        setSelectedYear(newMonth.getFullYear())
    }

    return (
        <FormField
            control={control}
            name="birthday"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-bold text-black">Birthday</FormLabel>
                    <FormControl>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={`rounded w-full pl-3 text-left font-normal border-2 border-black focus:ring-black focus:border-black ${
                                        !field.value && 'text-muted-foreground'
                                    }`}
                                >
                                    {field.value ? (
                                        format(field.value, 'MM/dd/yyyy')
                                    ) : (
                                        <span>Select date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0 border-2 border-black focus:ring-black focus:border-black bg-hrqColors-sunsetOrange-400"
                                align="start"
                            >
                                <div className="flex justify-between p-2 border-b border-black">
                                    <Select
                                        onValueChange={(value) => {
                                            const year = Number(value)
                                            setSelectedYear(year)
                                            setCurrentMonth(new Date(year, currentMonth.getMonth()))
                                            if (field.value) {
                                                const newDate = new Date(field.value)
                                                newDate.setFullYear(year)
                                                field.onChange(newDate)
                                            }
                                        }}
                                        value={selectedYear.toString()}
                                    >
                                        <SelectTrigger className="rounded w-[120px] border-2 border-black">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {years.map((year) => (
                                                <SelectItem
                                                    key={year}
                                                    value={year.toString()}
                                                >
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7 border-black"
                                            onClick={() => handleMonthChange(false)}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7 border-black"
                                            onClick={() => handleMonthChange(true)}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    month={currentMonth}
                                    onMonthChange={setCurrentMonth}
                                    disabled={(date) =>
                                        date > new Date() ||
                                        date < new Date('1900-01-01')
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}