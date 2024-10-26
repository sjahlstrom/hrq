"use client"

import * as React from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const formSchema = z.object({
    occupation: z.string().min(5, "Occupation must be at least 5 characters.").max(20, "Occupation must not exceed 20 characters."),
    education: z.string().min(5, "Education must be at least 5 characters.").max(20, "Education must not exceed 20 characters."),
    incomeRange: z.string({ required_error: "Please select an income range." }),
    postalCode: z.string().max(10, "Postal code must not exceed 10 characters."),
    areaCode: z.string().max(8, "Area code must not exceed 8 characters."),
    birthday: z.date({ required_error: "Please select a birthday." }),
    maritalStatus: z.string({ required_error: "Please select a marital status." }),
    relationshipTypeWanted: z.string({ required_error: "Please select a relationship type wanted." }),
    biologicalSex: z.string({ required_error: "Please select your biological sex." }),
    gender: z.string({ required_error: "Please select your gender." }),
    race: z.string({ required_error: "Please select your race." }),
    smoker: z.string({ required_error: "Please select your smoking status." }),
    dateSmoker: z.string({ required_error: "Please select if you would date a smoker." }),
    drugs: z.string({ required_error: "Please select your drug use status." }),
    dateMarijuanaUser: z.string({ required_error: "Please select if you would date a marijuana user." }),
    haveChildren: z.string({ required_error: "Please select if you have children." }),
    dateSomeoneWithKids: z.string({ required_error: "Please select if you would date someone with kids." }),
    religion: z.string({ required_error: "Please select your religion." }),
    primaryLanguage: z.string({ required_error: "Please select your primary language." }),
    otherLanguages: z.string({ required_error: "Please select your other languages." }),
    aboutYourself: z.string().max(6144, "Your description must not exceed 6144 characters."),
})

export default function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            occupation: "",
            education: "",
            incomeRange: "",
            postalCode: "",
            areaCode: "",
            maritalStatus: "",
            relationshipTypeWanted: "",
            biologicalSex: "",
            gender: "",
            race: "",
            smoker: "",
            dateSmoker: "",
            drugs: "",
            dateMarijuanaUser: "",
            haveChildren: "",
            dateSomeoneWithKids: "",
            religion: "",
            primaryLanguage: "",
            otherLanguages: "",
            aboutYourself: "",
        },
    })

    const [selectedYear, setSelectedYear] = React.useState<number>(new Date().getFullYear())

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i)

    const races = [
        "African-American", "Asian", "Black", "Caucasian", "Indian",
        "Indigenous/Aboriginal", "Latin/Hispanic", "Middle Eastern",
        "Native American", "Pacific Islander", "Other", "Prefer Not To Say"
    ]

    const smokerOptions = ["Yes", "No", "Cigars", "Pipe"]
    const dateSmokerOptions = ["Yes", "No"]
    const drugOptions = ["Yes", "No", "Marijuana"]
    const haveChildrenOptions = ["Yes", "No", "Over 18"]
    const dateSomeoneWithKidsOptions = ["Yes", "No", "Yes If Over 18"]
    const religionOptions = [
        "Non-Religious", "Anglican", "Baptist", "Buddhist", "Catholic",
        "Christian - Other", "Eastern Orthodox", "Hindu", "Jewish",
        "Mormon", "Muslim", "Sikh", "Spiritual", "Other"
    ]
    const languageOptions = [
        "English", "Spanish", "Arabic", "Dutch", "French", "German", "Hebrew",
        "Hindi", "Italian", "Japanese", "Norwegian", "Portuguese", "Russian",
        "Swedish", "Tagalog", "Urdu", "Other"
    ]

    return (
        <div className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="occupation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Occupation</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your occupation" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="education"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Education</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your education" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="incomeRange"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Income Range</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select income range" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="less_than_25000">Less than $25,000</SelectItem>
                                            <SelectItem value="25000_35000">$25,000 - $35,000</SelectItem>
                                            <SelectItem value="35000_50000">$35,000 - $50,000</SelectItem>
                                            <SelectItem value="50000_75000">$50,000 - $75,000</SelectItem>
                                            <SelectItem value="75000_100000">$75,000 - $100,000</SelectItem>
                                            <SelectItem value="100000_150000">$100,000 - $150,000</SelectItem>
                                            <SelectItem value="150000_plus">$150,000+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>Not visible to others</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Postal Code" maxLength={10} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="areaCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="1+ " maxLength={8} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="birthday"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Birthday</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "MM/dd/yyyy")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <div className="flex justify-between p-2 border-b">
                                                    <Select
                                                        onValueChange={(value) => {
                                                            const year = Number(value)
                                                            setSelectedYear(year)
                                                            if (field.value) {
                                                                const newDate = new Date(field.value)
                                                                newDate.setFullYear(year)
                                                                field.onChange(newDate)
                                                            }
                                                        }}
                                                        value={selectedYear.toString()}
                                                    >
                                                        <SelectTrigger className="w-[120px]">
                                                            <SelectValue placeholder="Select Year" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {years.map((year) => (
                                                                <SelectItem key={year} value={year.toString()}>
                                                                    {year}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(date) => {
                                                        field.onChange(date)
                                                        if (date) {
                                                            setSelectedYear(date.getFullYear())
                                                        }
                                                    }}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                    month={new Date(selectedYear, 0)}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="maritalStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Marital Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="single">Single</SelectItem>
                                            <SelectItem value="married">Married</SelectItem>
                                            <SelectItem value="divorced">Divorced</SelectItem>
                                            <SelectItem value="widowed">Widowed</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="relationshipTypeWanted"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Relationship Type Wanted</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="hang_out">Hang out</SelectItem>
                                            <SelectItem value="long_term">Long-Term</SelectItem>
                                            <SelectItem value="dating">Dating</SelectItem>
                                            <SelectItem value="just_friends">Just Friends</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="biologicalSex"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Biological Sex</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select sex" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Gender</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="non_binary">Non-Binary</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="race"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Race</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>

                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your race" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {races.map((race) => (
                                                <SelectItem key={race} value={race.toLowerCase().replace(/\s+/g, '-')}>
                                                    {race}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="smoker"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Smoker</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {smokerOptions.map((option) => (
                                                <SelectItem key={option} value={option.toLowerCase()}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="dateSmoker"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date a Smoker?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {dateSmokerOptions.map((option) => (
                                                <SelectItem key={option} value={option.toLowerCase()}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="drugs"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Drugs</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {drugOptions.map((option) => (
                                                <SelectItem key={option} value={option.toLowerCase()}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dateMarijuanaUser"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date a Marijuana User?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="yes">Yes</SelectItem>
                                            <SelectItem value="no">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="haveChildren"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Do you have children?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {haveChildrenOptions.map((option) => (
                                                <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dateSomeoneWithKids"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date Someone With Kids?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {dateSomeoneWithKidsOptions.map((option) => (
                                                <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="religion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Religion</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your religion" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {religionOptions.map((option) => (
                                                <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="primaryLanguage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Primary Language</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your primary language" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {languageOptions.map((option) => (
                                                <SelectItem key={option} value={option.toLowerCase()}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="otherLanguages"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Other Languages</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select other languages" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {languageOptions.map((option) => (
                                                <SelectItem key={option} value={option.toLowerCase()}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="aboutYourself"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tell Us About Yourself</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Share a bit about yourself..."
                                        className="resize-none"
                                        {...field}
                                        maxLength={10000}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Maximum 10000 characters
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </Form>
        </div>
    )
}