'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useIsAdmin } from '@/hooks/useIsAdmim'
import menuData from '@/components/Common/Header/menuData'

export default function Component() {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const [sticky, setSticky] = useState(false)
    const [openIndex, setOpenIndex] = useState(-1)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { isSignedIn } = useUser()
    const isAdmin = useIsAdmin()

    const navbarToggleHandler = () => {
        setNavbarOpen((prevState) => !prevState)
    }

    const handleStickyNavbar = () => {
        setSticky(window.scrollY >= 80)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setNavbarOpen(false)
            setOpenIndex(-1)
        }
    }

    const handleSubmenu = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index)
    }

    const handleSignInClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleStickyNavbar)
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            window.removeEventListener('scroll', handleStickyNavbar)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <header
            className={`header top-0 left-0 z-40 flex w-full items-center h-[84px] ${
                sticky
                    ? 'fixed z-[9999] bg-opacity-80 shadow-sticky backdrop-blur-sm transition'
                    : 'absolute'
            }`}
        >
            <div className="container h-full">
                <div className="relative mx-4 flex items-center justify-between h-full">
                    <div className="w-40 max-w-full px-4 xl:mr-12 relative h-[60px]">
                        <Link
                            href="/public"
                            className="header-logo w-full h-full flex items-center"
                        >
                            <Image
                                src="/images/logo/logo.webp"
                                alt="logo"
                                width={160}
                                height={60}
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </Link>
                    </div>

                    <div className="flex w-full items-center justify-between px-4">
                        <div>
                            <button
                                onClick={navbarToggleHandler}
                                id="navbarToggler"
                                aria-label="Mobile Menu"
                                className="absolute -right-12 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                            >
                                <span
                                    className={`relative my-1.5 block h-0.5 w-[30px] bg-hrqColors-coral-500 transition-all duration-300 ${
                                        navbarOpen
                                            ? ' top-[7px] rotate-45'
                                            : ' '
                                    }`}
                                />
                                <span
                                    className={`relative my-1.5 block h-0.5 w-[30px] bg-hrqColors-skyBlue-800 transition-all duration-300 ${
                                        navbarOpen ? 'opacity-0 ' : ' '
                                    }`}
                                />
                                <span
                                    className={`relative my-1.5 block h-0.5 w-[30px] bg-hrqColors-coral-500 transition-all duration-300 ${
                                        navbarOpen
                                            ? ' top-[-8px] -rotate-45'
                                            : ' '
                                    }`}
                                />
                            </button>

                            <nav
                                ref={dropdownRef}
                                id="navbarCollapse"
                                className={`navbar absolute right-1 z-30 w-[150px] py-4 px-6 duration-300 rounded-lg border border-white ${
                                    navbarOpen
                                        ? 'visible top-full opacity-100 bg-blue-500 bg-opacity-60'
                                        : 'invisible top-[120%] opacity-0'
                                } lg:visible lg:static lg:w-auto lg:border-none lg:!transparent lg:p-0 lg:opacity-100`}
                            >
                                <ul className="block lg:flex lg:space-x-12">
                                    {menuData.map((menuItem, index) => (
                                        <li
                                            key={menuItem.id}
                                            className="group relative"
                                        >
                                            {menuItem.path ? (
                                                <Link
                                                    href={menuItem.path}
                                                    className="flex py-2 text-base text-white lg:text-dark group-hover:opacity-70 lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                                                    onClick={() =>
                                                        setNavbarOpen(false)
                                                    }
                                                >
                                                    {menuItem.title}
                                                </Link>
                                            ) : (
                                                <>
                                                    <a
                                                        onClick={() =>
                                                            handleSubmenu(index)
                                                        }
                                                        className="flex cursor-pointer items-center justify-between py-2 text-base text-white lg:text-dark group-hover:opacity-70 lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                                                    >
                                                        {menuItem.title}
                                                        <span className="pl-3">
                                                            <svg
                                                                width="15"
                                                                height="14"
                                                                viewBox="0 0 15 14"
                                                            >
                                                                <path
                                                                    d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </a>
                                                    <div
                                                        className={`submenu relative top-full left-0 transition-[top] duration-300 group-hover:opacity-100 ${
                                                            openIndex === index
                                                                ? 'block'
                                                                : 'hidden'
                                                        } ${
                                                            navbarOpen
                                                                ? ''
                                                                : 'lg:rounded-lg lg:border lg:border-white lg:bg-blue-500 lg:bg-opacity-60'
                                                        } lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[150px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full`}
                                                    >
                                                        {menuItem.submenu?.map(
                                                            (submenuItem) =>
                                                                (submenuItem.id !==
                                                                    999 ||
                                                                    (isSignedIn &&
                                                                        isAdmin)) && (
                                                                    <Link
                                                                        href={submenuItem.path || '#'}
                                                                        key={
                                                                            submenuItem.id
                                                                        }
                                                                        className="block py-2.5 text-sm text-dark lg:text-white hover:opacity-70 lg:px-3"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            e.stopPropagation()
                                                                            setNavbarOpen(
                                                                                false
                                                                            )
                                                                        }}
                                                                    >
                                                                        {
                                                                            submenuItem.title
                                                                        }
                                                                    </Link>
                                                                )
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="flex items-center justify-end pr-4 lg:pr-0">
                            <div>
                                {isSignedIn ? (
                                    <>
                                        <UserButton />
                                        {isAdmin && (
                                            <Link href="/admin">
                                                <span className="ml-2 text-sm text-gray-100 hover:text-dark">
                                                    Admin
                                                </span>
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <Link href="/sign-in">
                                        <SignInButton>
                                            <Button
                                                onClick={handleSignInClick}
                                                size="sm"
                                                className="rounded-xl bg-[#fc6a4a] text-gray-700"
                                            >
                                                Login
                                            </Button>
                                        </SignInButton>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}