"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import menuData from '@/components/Header/menuData'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export default function Header() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [sticky, setSticky] = useState(false);
    const [openIndex, setOpenIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const { isSignedIn } = useUser();

    const navbarToggleHandler = () => {
        setNavbarOpen(!navbarOpen);
    };

    const handleStickyNavbar = () => {
        setSticky(window.scrollY >= 80);
    };

    const handleClickOutside = (event: Event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setNavbarOpen(false);
            setOpenIndex(-1);
        }
    };

    const handleSubmenu = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const handleSignInClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleStickyNavbar);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleStickyNavbar);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header
            className={`header top-0 left-0 z-40 flex w-full items-center h-[84px] ${
                sticky
                    // add bg-xxx to add color to menu scroll
                    ? "fixed z-[9999] bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
                    : "absolute"
            }`}
        >
            <div className="container h-full">
                <div className="relative mx-4 flex items-center justify-between h-full">
                    <div className="w-40 max-w-full px-4 xl:mr-12 relative h-[60px]">
                        <Link href="/" className="header-logo w-full h-full flex items-center">
                            <Image
                                src="/images/logo/logo.webp"
                                alt="logo"
                                fill
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
                                        navbarOpen ? ' top-[7px] rotate-45' : ' '
                                    }`}
                                />
                                <span
                                    className={`relative my-1.5 block h-0.5 w-[30px] bg-hrqColors-skyBlue-800 transition-all duration-300 ${
                                        navbarOpen ? 'opacity-0 ' : ' '
                                    }`}
                                />
                                <span
                                    className={`relative my-1.5 block h-0.5 w-[30px] bg-hrqColors-coral-500 transition-all duration-300 ${
                                        navbarOpen ? ' top-[-8px] -rotate-45' : ' '
                                    }`}
                                />
                            </button>

                            <nav
                                ref={dropdownRef}
                                id="navbarCollapse"
                                className={`navbar absolute right-1 translate-x-[40px] z-30 w-[150px] rounded border-[.5px] border-body-color/50  py-4 px-6 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!.transparent lg:p-0 lg:opacity-100
    ${
                                    navbarOpen
                                        ? 'visibility top-full opacity-100'
                                        : 'invisible top-[120%] opacity-0'
                                }`}
                            >


                                <ul className="block lg:flex lg:space-x-12">
                                    {menuData.map((menuItem, index) => (
                                        <li key={menuItem.id} className="group relative">
                                            {menuItem.path ? (
                                                <Link
                                                    href={menuItem.path}
                                                    className="flex py-2 text-base text-dark group-hover:opacity-40 lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                                                    onClick={() => setNavbarOpen(false)}
                                                >
                                                    {menuItem.title}
                                                </Link>
                                            ) : (
                                                <>
                                                    <a
                                                        onClick={() => handleSubmenu(index)}
                                                        className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:opacity-70 lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                                                    >
                                                        {menuItem.title}
                                                        <span className="pl-3">
                                                            <svg width="15" height="14" viewBox="0 0 15 14">
                                                                <path
                                                                    d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </a>
                                                    <div
                                                        className={`submenu relative top-full left-0 rounded-md  transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                                            openIndex === index ? 'block' : 'hidden'
                                                        }`}
                                                    >
                                                        {menuItem.submenu.map((submenuItem) => (
                                                            <Link
                                                                href={submenuItem.path}
                                                                key={submenuItem.id}
                                                                className="block rounded py-2.5 text-sm text-gray-200 hover:opacity-40 lg:px-3"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    setNavbarOpen(false)
                                                                }}
                                                            >
                                                                {submenuItem.title}
                                                            </Link>
                                                        ))}
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
                                    <UserButton />
                                ) : (
                                    <Link href="/sign-in">
                                        <SignInButton>
                                            <Button
                                                onClick={handleSignInClick}
                                                size="sm"
                                                className="rounded-xl bg-hrqColors-peach-300 text-gray-700"
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
    );
}