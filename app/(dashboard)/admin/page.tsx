'use client'
import Link from 'next/link'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { BarChart, Users } from 'lucide-react'
import CheckUserRole from '@/components/check-user-role'
import Breadcrumb from '@/components/common/bread-crumb'
import React from 'react'

export default function AdminDashboard() {
    return (
        <>
        <div className="bg-gray-600">
            <Breadcrumb
                pageName="Admin Page"
                minHeight="min-h-[220px]"
                description="Various admin dashboard features"
            />
        </div>
    <div className="flex h-screen">
        <CheckUserRole />
        <aside className="bg-gradient-to-br from-hrqColors-skyBlue-500 to-hrqColors-skyBlue-100 w-64 bg-card text-card-foreground border-r">
            <div className="p-4">
                <h2 className="text-lg text-dark font-semibold mb-4">Admin Dashboard</h2>
                <Command className="rounded-xl border text-dark shadow-md">
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Navigation">
                                <CommandItem>
                                    <Users className="mr-2 h-4 w-4" />
                                    <Link href="/users">Users</Link>
                                </CommandItem>
                                <CommandItem>
                                    <BarChart className="mr-2 h-4 w-4" />
                                    <Link href="/stats">Stats</Link>
                                </CommandItem>

                                <CommandItem>
                                    <BarChart className="mr-2 h-4 w-4" />
                                    <Link href="/items">Items</Link>
                                </CommandItem>

                            </CommandGroup>
                        </CommandList>
                    </Command>


                </div>
                <div className="p-4 mt-8">
                    <p className="text-sm text-dark">
                        Other functionality may come later
                    </p>
                </div>
            </aside>
            <main className="bg-gradient-to-br from-gray-200 to-gray-600  flex-1 p-8">
                <header className="mb-8">
                    <h1 className=" text-dark text-3xl font-bold ">Welcome to the Admin Dashboard</h1>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Add your dashboard content here */}
                    {/*<div className="p-6 bg-card rounded-lg shadow">*/}
                    {/*    <h3 className="text-lg font-semibold mb-2">Total Users</h3>*/}
                    {/*    <p className="text-3xl font-bold">1,234</p>*/}
                    {/*</div>*/}
                    {/*<div className="p-6 bg-card rounded-lg shadow">*/}
                    {/*    <h3 className="text-lg font-semibold mb-2">Active Articles</h3>*/}
                    {/*    <p className="text-3xl font-bold">42</p>*/}
                    {/*</div>*/}

                </div>
            </main>
        </div>
            </>
    )
}