const PriceCard = () => {

    return (
    <div className="flex flex-col mt-12 md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
        {/* Left section */}
        <div className="p-8 md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-900">Exclusive Offer</h2>
            <p className="mt-4 text-gray-600">
                Get access to your comprehensive test analysis and personalized improvement suggestions.
                Your results will always be available to you anytime you log in.

            </p>
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-red-600 mb-3">WHAT&apos;S INCLUDED</h3>
                <ul className="space-y-3 text-black">
                    <li className="flex items-center">
                        {/*<svg className="w-6 h-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">*/}
                        {/*    <path fillRule="evenodd"*/}
                        {/*          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"*/}
                        {/*          clipRule="evenodd" />*/}
                        {/*</svg>*/}
                        <span>Access to your in-depth test analysis</span>
                    </li>
                    <li className="flex items-center">
                        {/*<svg className="w-6 h-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">*/}
                        {/*    <path fillRule="evenodd"*/}
                        {/*          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"*/}
                        {/*          clipRule="evenodd" />*/}
                        {/*</svg>*/}
                        <span>Lifetime access</span>
                    </li>
                    <li className="flex items-center">
                        {/*<svg className="w-6 h-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">*/}
                        {/*    <path fillRule="evenodd"*/}
                        {/*          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"*/}
                        {/*          clipRule="evenodd" />*/}
                        {/*</svg>*/}
                        <span>Mobile and web access</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Right section */}
        <div className="bg-gray-50 p-8 md:w-1/3 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-gray-900">Limited Time Offer</h3>
            <p className="text-sm text-gray-400 line-through mb-1">$9.95</p>
            {/*<p className="text-red-600 text-sm mb-4">Special promotion</p>*/}
            {/*<p className="text-4xl font-bold text-gray-900 mb-2">$99.99 <span className="text-xl font-medium">USD</span>*/}
            {/*</p>*/}
            <button className="mt-4 bg-gray-900 text-white text-lg font-medium py-2 px-4 rounded-lg hover:bg-gray-700">
                Get Exclusive Access
            </button>
        </div>
    </div>
    )
}

export default PriceCard;