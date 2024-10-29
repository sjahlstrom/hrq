'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { savePreferences } from '@/app/actions/update-preferences'
import { Toaster, toast } from 'sonner'

export default function PreferencesForm() {
    const [formData, setFormData] = useState({})

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const formData = new FormData(form)
        const result = await savePreferences(formData)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success("Your preferences have been saved.")
        }
    }

    const languageOptions = [
        'English', 'Spanish', 'Arabic', 'Chinese', 'Dutch', 'French', 'German', 'Hebrew',
        'Hindi', 'Italian', 'Japanese', 'Korean', 'Norwegian', 'Portuguese', 'Russian',
        'Swedish', 'Tagalog', 'Urdu'
    ]

    return (
        <>

                <Toaster position="top-center" />
                <div className="bg-custom-radial from-hrqColors-skyBlue-900 to-hrqColors-skyBlue-700 p-6">

                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-4xl mx-auto space-y-8"
                    >
                        <br />
                        <div className="space-y-6">
                            <h1 className="text-2xl text-black font-bold">Preferences - Must Have</h1>
                            <div className="grid gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="education">Education</Label>
                                        <Select name="education"
                                                onValueChange={(value) => handleChange('education', value)}>
                                            <SelectTrigger id="education" className="border-black text-hrqColors-coolGray-300">
                                                <SelectValue placeholder="Education level"/>
                                            </SelectTrigger >
                                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                                {['High School', 'Some College', 'Associate of Arts', 'Bachelor of Arts/Science', 'Graduate Degree', 'PhD/Post Doc'].map((level) => (
                                                    <SelectItem key={level}
                                                                value={level.toLowerCase().replace(' ', '-')}
                                                                className="focus:bg-coolGray-600 focus:text-white">{level}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="income">Income Range</Label>
                                        <Select name="income" onValueChange={(value) => handleChange('income', value)}>
                                            <SelectTrigger id="income" className="border-black  text-hrqColors-coolGray-300">
                                                <SelectValue placeholder="Income range" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                                {['$25,000 - $35,000', '$35,000 - $50,000', '$50,000 - $75,000', '$75,000 - $100,000', '> $100,000'].map((range) => (
                                                    <SelectItem key={range}
                                                                value={range.toLowerCase().replace(/\$|,/g, '')}
                                                                className="focus:bg-coolGray-600 focus:text-white">{range}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="maritalStatus">Marital Status</Label>
                                        <Select name="maritalStatus"
                                                onValueChange={(value) => handleChange('maritalStatus', value)}>
                                            <SelectTrigger id="maritalStatus" className="border-black text-hrqColors-coolGray-300">
                                                <SelectValue placeholder="Marital status" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                                {['Single', 'Married', 'Divorced', 'Widowed'].map((status) => (
                                                    <SelectItem key={status} value={status.toLowerCase()}
                                                                className="focus:bg-coolGray-600 focus:text-white">{status}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="relationshipType">Type of Relationship Wanted</Label>
                                        <Select name="relationshipType"
                                                onValueChange={(value) => handleChange('relationshipType', value)}>
                                            <SelectTrigger id="relationshipType" className="border-black text-hrqColors-coolGray-300">
                                                <SelectValue placeholder="Relationship type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                                {['Hang out', 'Long-Term', 'Dating', 'Sexual', 'Just Friends'].map((type) => (
                                                    <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}
                                                                className="focus:bg-coolGray-600 focus:text-white">{type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="biologicalSex">Biological Sex</Label>
                                        <Select name="biologicalSex"
                                                onValueChange={(value) => handleChange('biologicalSex', value)}>
                                            <SelectTrigger id="biologicalSex" className="border-black text-hrqColors-coolGray-300">
                                                <SelectValue placeholder="Biological sex" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                                {['Male', 'Female'].map((sex) => (
                                                    <SelectItem key={sex} value={sex.toLowerCase()}
                                                                className="focus:bg-coolGray-600 focus:text-white">{sex}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Gender</Label>
                                        <Select name="gender" onValueChange={(value) => handleChange('gender', value)}>
                                            <SelectTrigger id="gender" className="border-black text-hrqColors-coolGray-300">
                                                <SelectValue placeholder="Gender" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                                {['Male', 'Female'].map((gender) => (
                                                    <SelectItem key={gender} value={gender.toLowerCase()}
                                                                className="focus:bg-coolGray-600 focus:text-white">{gender}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dateSmoker">Date Smoker</Label>
                                        <Select name="dateSmoker"
                                                onValueChange={(value) => handleChange('dateSmoker', value)}>
                                            <SelectTrigger id="dateSmoker" className="border-black text-hrqColors-coolGray-300">
                                                <SelectValue placeholder="Date a smoker?" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                                {['Yes', 'No'].map((option) => (
                                                    <SelectItem key={option} value={option.toLowerCase()}
                                                                className="focus:bg-coolGray-600 focus:text-white">{option}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dateSmoker">Date Drinker</Label>
                                        <Select name="dateDrinker"
                                                onValueChange={(value) => handleChange('dateDrinker', value)}>
                                            <SelectTrigger id="dateDrinker" className="border-black text-hrqColors-coolGray-300">
                                                <SelectValue placeholder="Date a drinker?" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                                {['Yes', 'No'].map((option) => (
                                                    <SelectItem key={option} value={option.toLowerCase()}
                                                                className="focus:bg-coolGray-600 focus:text-white">{option}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <h1 className="text-2xl  text-black font-bold">Preferences - Nice to Have</h1>
                                    <br />
                                    <div className="space-y-2">
                                        <Label htmlFor="race">Race</Label>
                                        <Select name="race" onValueChange={(value) => handleChange('race', value)}>
                                            <SelectTrigger id="race" className="border-black text-hrqColors-coolGray-300">
                                                <SelectValue placeholder="Race" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                                {['African-American', 'Asian', 'Black', 'Caucasian', 'Indian', 'Indigenous/Aboriginal', 'Middle Eastern', 'Native American', 'Pacific Islander'].map((race) => (
                                                    <SelectItem key={race} value={race.toLowerCase().replace(' ', '-')}
                                                                className="focus:bg-coolGray-600 focus:text-white">{race}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dateMarijuanaUser">Date Marijuana User</Label>
                                        <Select name="dateMarijuanaUser"
                                                onValueChange={(value) => handleChange('dateMarijuanaUser', value)}>
                                            <SelectTrigger id="dateMarijuanaUser" className="border-black text-hrqColors-coolGray-300">
                                                <SelectValue placeholder="Date a marijuana user?" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                                {['Yes', 'No'].map((option) => (
                                                    <SelectItem key={option} value={option.toLowerCase()}
                                                                className="focus:bg-coolGray-600 focus:text-white">{option}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dateSomeoneWithKids">Date Someone with Kids</Label>
                                        <Select name="dateSomeoneWithKids"
                                                onValueChange={(value) => handleChange('dateSomeoneWithKids', value)}>
                                            <SelectTrigger id="dateSomeoneWithKids" className="border-black text-hrqColors-coolGray-300">
                                                <SelectValue placeholder="Date someone with kids?" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                                {['Yes', 'No'].map((option) => (
                                                    <SelectItem key={option} value={option.toLowerCase()}
                                                                className="focus:bg-coolGray-600 focus:text-white">{option}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="primaryLanguage">Primary Language</Label>
                                        <Select name="primaryLanguage"
                                                onValueChange={(value) => handleChange('primaryLanguage', value)}>
                                            <SelectTrigger id="primaryLanguage" className="border-black text-hrqColors-coolGray-300">
                                                <SelectValue placeholder="Primary language" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-500 [&>div]:bg-coolGray-500">
                                                {languageOptions.map((language) => (
                                                    <SelectItem key={language} value={language.toLowerCase()}
                                                                className="focus:bg-coolGray-600 focus:text-white">{language}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button type="submit"
                                className="w-full">Submit</Button>
                        {/*className="w-full bg-hrqColors-sunsetOrange-200 hover:bg-hrqColors-sunsetOrange-300 active:bg-hrqColors-sunsetOrange-400 text-black rounded"></Button>*/}

                    </form>
                </div>
            </>
            )
            }