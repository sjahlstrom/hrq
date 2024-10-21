// 'use client'
//
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import * as z from 'zod'
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
//
// const formSchema = z.object({
//     biologicalSex: z.enum(['male', 'female'], {
//         required_error: "Biological sex is required.",
//     }),
//     genderIdentity: z.enum(['male', 'female', 'other'], {
//         required_error: "Gender identity is required.",
//     }),
//     transgenderStatus: z.object({
//         notTransgender: z.boolean().default(false),
//         transMale: z.boolean().default(false),
//         transFemale: z.boolean().default(false),
//     }),
//     age: z.string().min(1, {
//         message: "Age is required.",
//     }),
//     postalCode: z.string().max(10, {
//         message: "Postal code must be 10 characters or less.",
//     }),
//     partnerPreferences: z.object({
//         male: z.boolean().default(false),
//         female: z.boolean().default(false),
//         transMale: z.boolean().default(false),
//         transFemale: z.boolean().default(false),
//         older: z.boolean().default(false),
//         younger: z.boolean().default(false),
//         sameAge: z.boolean().default(false),
//     }),
//     aboutYourself: z.string().max(2048, {
//         message: "Bio must be 2048 characters or less.",
//     }),
// })
//
// export default function DatingProfileForm() {
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             transgenderStatus: {
//                 notTransgender: false,
//                 transMale: false,
//                 transFemale: false,
//             },
//             partnerPreferences: {
//                 male: false,
//                 female: false,
//                 transMale: false,
//                 transFemale: false,
//                 older: false,
//                 younger: false,
//                 sameAge: false,
//             },
//         },
//     })
//
//     function onSubmit(values: z.infer<typeof formSchema>) {
//         console.log(values)
//     }
//
//     return (
//         <div className="container mx-auto p-4 max-w-4xl">
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <FormField
//                             control={form.control}
//                             name="biologicalSex"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Biological Sex</FormLabel>
//                                     <FormControl>
//                                         <RadioGroup
//                                             onValueChange={field.onChange}
//                                             defaultValue={field.value}
//                                             className="flex flex-col space-y-1"
//                                         >
//                                             <FormItem className="flex items-center space-x-3 space-y-0">
//                                                 <FormControl>
//                                                     <RadioGroupItem value="male" />
//                                                 </FormControl>
//                                                 <FormLabel className="font-normal">
//                                                     Male
//                                                 </FormLabel>
//                                             </FormItem>
//                                             <FormItem className="flex items-center space-x-3 space-y-0">
//                                                 <FormControl>
//                                                     <RadioGroupItem value="female" />
//                                                 </FormControl>
//                                                 <FormLabel className="font-normal">
//                                                     Female
//                                                 </FormLabel>
//                                             </FormItem>
//                                         </RadioGroup>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//
//                         <FormField
//                             control={form.control}
//                             name="genderIdentity"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Gender Identity</FormLabel>
//                                     <FormControl>
//                                         <RadioGroup
//                                             onValueChange={field.onChange}
//                                             defaultValue={field.value}
//                                             className="flex flex-col space-y-1"
//                                         >
//                                             <FormItem className="flex items-center space-x-3 space-y-0">
//                                                 <FormControl>
//                                                     <RadioGroupItem value="male" />
//                                                 </FormControl>
//                                                 <FormLabel className="font-normal">
//                                                     Male
//                                                 </FormLabel>
//                                             </FormItem>
//                                             <FormItem className="flex items-center space-x-3 space-y-0">
//                                                 <FormControl>
//                                                     <RadioGroupItem value="female" />
//                                                 </FormControl>
//                                                 <FormLabel className="font-normal">
//                                                     Female
//                                                 </FormLabel>
//                                             </FormItem>
//                                             <FormItem className="flex items-center space-x-3 space-y-0">
//                                                 <FormControl>
//                                                     <RadioGroupItem value="other" />
//                                                 </FormControl>
//                                                 <FormLabel className="font-normal">
//                                                     Other
//                                                 </FormLabel>
//                                             </FormItem>
//                                         </RadioGroup>
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//
//                         <FormItem>
//                             <FormLabel>Transgender Status</FormLabel>
//                             <div className="flex flex-col space-y-1">
//                                 {['notTransgender', 'transMale', 'transFemale'].map((status) => (
//                                     <FormField
//                                         key={status}
//                                         control={form.control}
//                                         name={`transgenderStatus.${status}` as any}
//                                         render={({ field }) => (
//                                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                                                 <FormControl>
//                                                     <Checkbox
//                                                         checked={field.value}
//                                                         onCheckedChange={field.onChange}
//                                                     />
//                                                 </FormControl>
//                                                 <FormLabel className="font-normal">
//                                                     {status === 'notTransgender' ? 'Not Transgender' :
//                                                         status === 'transMale' ? 'Transgender Male' : 'Transgender Female'}
//                                                 </FormLabel>
//                                             </FormItem>
//                                         )}
//                                     />
//                                 ))}
//                             </div>
//                             <FormMessage />
//                         </FormItem>
//                     </div>
//                     <hr />
//                     <div className=" flex justify-center space-x-4">
//                         <FormField
//                             control={form.control}
//                             name="age"
//                             render={({ field }) => (
//                                 <FormItem className="w-20">
//                                     <FormLabel>Age</FormLabel>
//                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                         <FormControl>
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Age" />
//                                             </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                             {Array.from({ length: 82 }, (_, i) => i + 18).map((age) => (
//                                                 <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//
//                         <FormField
//                             control={form.control}
//                             name="postalCode"
//                             render={({ field }) => (
//                                 <FormItem className="w-40">
//                                     <FormLabel>Postal Code</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="Enter postal code" {...field} maxLength={10} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>
//                     <hr />
//                     <FormItem>
//                         <FormLabel>Partner Preferences</FormLabel>
//                         <FormDescription>Select all that apply</FormDescription>
//                         <div className="flex justify-center">
//                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                                 {['male', 'female', 'transMale', 'transFemale', 'older', 'younger', 'sameAge'].map((pref) => (
//                                     <FormField
//                                         key={pref}
//                                         control={form.control}
//                                         name={`partnerPreferences.${pref}` as any}
//                                         render={({ field }) => (
//                                             <FormItem className="flex flex-col items-center space-y-2">
//                                                 <FormControl>
//                                                     <Checkbox
//                                                         checked={field.value}
//                                                         onCheckedChange={field.onChange}
//                                                     />
//                                                 </FormControl>
//                                                 <FormLabel className="font-normal text-center">
//                                                     {pref.charAt(0).toUpperCase() + pref.slice(1)}
//                                                 </FormLabel>
//                                             </FormItem>
//                                         )}
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     </FormItem>
//
//                     <FormField
//                         control={form.control}
//                         name="aboutYourself"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>About Yourself</FormLabel>
//                                 <FormControl>
//                                     <Textarea
//                                         placeholder="Tell us about yourself"
//                                         className="resize-none"
//                                         {...field}
//                                     />
//                                 </FormControl>
//                                 <FormDescription>
//                                     You can enter up to 2048 characters.
//                                 </FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//
//                     <Button type="submit">Submit</Button>
//                 </form>
//             </Form>
//         </div>
//     )
// }
//

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
    biologicalSex: z.enum(['male', 'female'], {
        required_error: "Biological sex is required.",
    }),
    genderIdentity: z.enum(['male', 'female', 'other'], {
        required_error: "Gender identity is required.",
    }),
    transgenderStatus: z.enum(['notTransgender', 'transMale', 'transFemale', 'nonBinary', 'preferNotToSay'], {
        required_error: "Transgender status is required.",
    }),
    age: z.string().min(1, {
        message: "Age is required.",
    }),
    postalCode: z.string().max(10, {
        message: "Postal code must be 10 characters or less.",
    }),
    partnerPreferences: z.object({
        male: z.boolean().default(false),
        female: z.boolean().default(false),
        transMale: z.boolean().default(false),
        transFemale: z.boolean().default(false),
        older: z.boolean().default(false),
        younger: z.boolean().default(false),
        sameAge: z.boolean().default(false),
    }),
    aboutYourself: z.string().max(2048, {
        message: "Bio must be 2048 characters or less.",
    }),
})

export default function DatingProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            transgenderStatus: 'notTransgender',
            partnerPreferences: {
                male: false,
                female: false,
                transMale: false,
                transFemale: false,
                older: false,
                younger: false,
                sameAge: false,
            },
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="biologicalSex"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Biological Sex</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="male" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Male
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="female" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Female
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="genderIdentity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender Identity</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="male" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Male
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="female" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Female
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="other" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Other
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="transgenderStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transgender Status</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            {[
                                                { value: 'notTransgender', label: 'Not Transgender' },
                                                { value: 'transMale', label: 'Transgender Male' },
                                                { value: 'transFemale', label: 'Transgender Female' },
                                                { value: 'nonBinary', label: 'Non-Binary' },
                                                { value: 'preferNotToSay', label: 'Prefer Not to Say' },
                                            ].map((option) => (
                                                <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value={option.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {option.label}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <hr />
                    <div className="flex justify-center space-x-4">
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem className="w-20">
                                    <FormLabel>Age</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Age" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Array.from({ length: 82 }, (_, i) => i + 18).map((age) => (
                                                <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                                <FormItem className="w-40">
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter postal code" {...field} maxLength={10} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <hr />
                    <FormItem>
                        <FormLabel>Partner Preferences</FormLabel>
                        <FormDescription>Select all that apply</FormDescription>
                        <div className="flex justify-center">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {['male', 'female', 'transMale', 'transFemale', 'older', 'younger', 'sameAge'].map((pref) => (
                                    <FormField
                                        key={pref}
                                        control={form.control}
                                        name={`partnerPreferences.${pref}` as any}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-center space-y-2">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-center">
                                                    {pref.charAt(0).toUpperCase() + pref.slice(1)}
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </FormItem>

                    <FormField
                        control={form.control}
                        name="aboutYourself"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>About Yourself</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us about yourself"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    You can enter up to 2048 characters.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}