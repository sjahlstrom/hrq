import { laila, telex } from '@/app/ui/fonts'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer>
            <div className=" bg-night-100">
                <div className="container px-6 py-8 mx-auto">
                    {/*<div className="flex flex-col items-center -mt-2 text-center text-brown-900">*/}
                    {/*    <div className={telex.className}>*/}
                    {/*        <p>High Relationship Quotient</p>*/}
                    {/*    </div>*/}

                    <Link href="/" className="cursor-pointer">
                        <div className="text-off-white flex flex-col items-center -mt-2 text-center ">
                            <div className={telex.className}>
                                <p>High Relationship Quotient</p>
                            </div>
                        </div>
                    </Link>

                    <div
                        className={`flex flex-wrap justify-center mt-4 -mx-4 ${telex.className}`}
                    >
                        {[
                            { href: '/', label: 'Home', ariaLabel: 'Home' },
                            {
                                href: '/about',
                                label: 'About',
                                ariaLabel: 'About',
                            },
                            {
                                href: '/tos',
                                label: 'Privacy',
                                ariaLabel: 'Privacy',
                            },
                        ].map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`mx-4 text-sm transition-colors duration-300 text-brown-800 hover:text-brown-500 ${telex.className}`}
                                aria-label={link.ariaLabel}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <hr className="my-6 md:my-4 border-gray-700" />

                    <div
                        className={`flex flex-col items-center sm:flex-row sm:justify-between ${laila.className}`}
                    >
                        <p className="text-xs text-third ">
                            Copyright © Pending, 06/22/2019. HighRQ, Inc. All
                            Rights Reserved. HighRQ, Relationship quotient (RQ),
                            Compatibility Quotient (CQ), and several other
                            marks, colors, and images are registered and common
                            law trademarks of HighRQ, Inc. Other trademarks and
                            brands are the property of their respective owners.
                        </p>
                    </div>

                    <div className="flex -mx-2">
                        <a
                            href="#"
                            className="mx-2 transition-colors duration-300 text-gray-300 hover:text-blue-500 "
                            aria-label="Reddit"
                        >
                            {/* SVG for Reddit */}
                        </a>

                        <a
                            href="#"
                            className="mx-2 transition-colors duration-300 text-gray-300 hover:text-blue-500 "
                            aria-label="Facebook"
                        >
                            {/* SVG for Facebook */}
                        </a>

                        <a
                            href="#"
                            className="mx-2 transition-colors duration-300 text-gray-300 hover:text-blue-500 "
                            aria-label="Github"
                        >
                            {/* SVG for Github */}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
