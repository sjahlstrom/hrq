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
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
            />
        </div>
    <div className="flex h-screen">
        <CheckUserRole />
        <aside className="w-64 bg-card text-card-foreground border-r">
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
                <Command className="rounded-lg border shadow-md">
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
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
                <div className="p-4 mt-8">
                    <p className="text-sm text-muted-foreground">
                        Other functionality may come later
                    </p>
                </div>
            </aside>
            <main className="flex-1 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Welcome to the Admin Dashboard</h1>
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