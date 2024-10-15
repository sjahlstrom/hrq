// export default function PaymentSuccess({
//     searchParams: { amount },
// }: {
//     searchParams: { amount: string }
// }) {
//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//             <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
//                 <h1 className="text-2xl font-bold text-gray-800 mb-6">
//                     Purchase Successful!
//                 </h1>
//                 <p className="text-gray-600 mb-6">
//                     Thank you for your purchase. Your test results are now
//                     available.
//                 </p>
//                 <a
//                     href="/success" // Adjust this to your actual results page
//                     className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
//                 >
//                     View Your Results
//                 </a>
//             </div>
//         </div>
//     )
// }

import { Button } from '@/components/ui/button'

export default function PaymentSuccess({
    searchParams: { amount },
}: {
    searchParams: { amount: string }
}) {
    return (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
                <h2 className="text-2xl">You successfully sent</h2>

                <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
                    ${amount}
                </div>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your test results are now
                    available.
                </p>
                <Button>View your results</Button>
            </div>
        </main>
    )
}
