'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const NotFoundPage = () => {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/');
    };

    return (
        <section className="bg-white mt-20 dark:bg-gray-900">
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div className="w-full lg:w-1/2">
                    <p className="text-sm font-medium text-blue-500 dark:text-blue-400">404 error</p>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Page not
                        found</h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">I&#39;m sorry, we&#39;re lost</p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <button
                            onClick={handleRedirect}
                            className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-xl shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                            Take me home country road to the place that I belong
                        </button>
                    </div>
                </div>

                <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                    <Image
                        src="/images/lost.jpg"
                        alt="Lost"

                        width={500}  // Adjust width as needed
                        height={500} // Adjust height as needed
                        className="w-full max-w-lg lg:mx-auto"
                    />
                </div>
            </div>
        </section>
    )
}

export default NotFoundPage;
