import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command'
import {
    LayoutDashboard,
    Newspaper,
    Folders,
    CreditCard,
    Settings,
    User,
} from 'lucide-react'
import Link from 'next/link'

const Sidebar = () => {
    return (
        <div className=" bg-gray-700 mt-0 rounded  hidden md:block h-[90vh] w-[260px]">
            <div className="fixed left-4 h-full w-1/5 bg-secondary">
                <Command className="bg-secondary rounded-none mt-20">
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {/*    <CommandItem>*/}
                            {/*        <LayoutDashboard className='mr-4 h-4 w-12' />*/}
                            {/*        <Link href='/public'>Dashboard</Link>*/}
                            {/*    </CommandItem>*/}
                            <CommandItem>
                                <Newspaper className="mr-4 h-4 w-12" />
                                <Link href="/users">Users</Link>
                            </CommandItem>
                            <CommandItem>
                                <Newspaper className="mr-4 h-4 w-12" />
                                <Link href="/stats">Stats</Link>
                            </CommandItem>
                            <br /><br /><br /><br />
                            <p> Other functionality may <br />come later</p>
                            {/*    <CommandItem>*/}
                            {/*        <Folders className='mr-4 h-4 w-12' />*/}
                            {/*        <Link href='#'>Categories</Link>*/}
                            {/*    </CommandItem>*/}
                            {/*        </CommandGroup>*/}
                            {/*        <CommandSeparator />*/}
                            {/*        <CommandGroup heading='Settings'>*/}
                            {/*            <CommandItem>*/}
                            {/*                <User className='mr-4 h-4 w-12' />*/}
                            {/*                <span>Profile</span>*/}
                            {/*                /!*<CommandShortcut>⌘P</CommandShortcut>*!/*/}
                            {/*            </CommandItem>*/}
                            {/*            <CommandItem>*/}
                            {/*                <CreditCard className='mr-4 h-4 w-12' />*/}
                            {/*                <span>Billing</span>*/}
                            {/*                /!*<CommandShortcut>⌘B</CommandShortcut>*!/*/}
                            {/*            </CommandItem>*/}
                            {/*            <CommandItem>*/}
                            {/*                <Settings className='mr-4 h-4 w-12' />*/}
                            {/*                <span>Settings</span>*/}
                            {/*                /!*<CommandShortcut>⌘S</CommandShortcut>*!/*/}
                            {/*            </CommandItem>*/}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </div>
        </div>

    )
}

export default Sidebar
