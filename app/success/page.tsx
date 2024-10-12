export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Purchase Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your test results are now available.
                </p>
                <a
                    href="/success" // Adjust this to your actual results page
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
                >
                    View Your Results
                </a>
            </div>
        </div>
    )
}