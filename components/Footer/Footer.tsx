import { roboto_mono, poppins } from '@/app/ui/fonts'

const Footer = () => {
    return (
        <footer
            // className="border-2 wow fadeInUp relative z-10 bg-primary bg-opacity-5 pt-16 md:pt-20 lg:pt-24"
            // data-wow-delay=".1s"
            className="border-blue-950 border-2"
        >
            <div className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-8 mx-auto">
                    <div className="flex flex-col items-center text-center text-gray-200">
                        <div className={roboto_mono.className}>
                            <p> High Relationship Quotient</p>
                        </div>

                        <div className={`flex flex-wrap justify-center mt-6 -mx-4 ${poppins.className}`}>
                            {[
                                { href: '/', label: 'Home', ariaLabel: 'Home' },
                                { href: '/about', label: 'About', ariaLabel: 'About' },
                                { href: '/tos', label: 'Privacy', ariaLabel: 'Privacy' },
                            ].map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 ${roboto_mono.className}`}
                                    aria-label={link.ariaLabel}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>


                    </div>

                    <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

                    <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            Copyright © Pending, 06/22/2019. HighRQ, Inc. All
                            Rights Reserved. HighRQ, Relationship quotient (RQ),
                            Compatibility Quotient (CQ), and several other
                            marks, colors, and images are registered and common
                            law trademarks of HighRQ, Inc. Other trademarks and
                            brands are the property of their respective owners.
                        </p>
                        <div className="flex -mx-2">
                            <a
                                href="#"
                                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                aria-label="Reddit"
                            >
                                {/* SVG for Reddit */}
                            </a>

                            <a
                                href="#"
                                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                aria-label="Facebook"
                            >
                                {/* SVG for Facebook */}
                            </a>

                            <a
                                href="#"
                                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                aria-label="Github"
                            >
                                {/* SVG for Github */}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
