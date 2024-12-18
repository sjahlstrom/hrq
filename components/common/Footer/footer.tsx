import { laila, telex } from '@/app/ui/fonts'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer>
            <div className="bg-custom-radial from-hrqColors-skyBlue-800 to-hrqColors-skyBlue-400">
                <div className="container px-6 py-8 mx-auto">
                    <Link href="/public" className="cursor-pointer">
                        <div className=" flex flex-col items-center -mt-2 text-center ">
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
                                className={`mx-4 text-sm transition-colors duration-300 text-blue-400 hover:text-blue-600 ${telex.className}`}
                                aria-label={link.ariaLabel}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <hr className="my-6 md:my-4 border-hrqColors-sunsetOrange-300" />

                    <div
                        className={`flex flex-col items-center ${laila.className}`}
                    >
                        <p className="justify-center text-center text-xs text-blue-100">
                            Copyright © 2024. HighRQ, Inc. All Rights Reserved.                        </p>

                        <p className="justify-center text-center text-xs text-blue-100">
                            HighRQ, Relationship quotient (RQ), Compatibility
                            Quotient (CQ), and other marks, colors, and
                            images are registered and common law trademarks of
                            HighRQ, LLC.
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
