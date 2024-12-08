import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Success',
}

export default function PaymentSuccess({
    searchParams: { amount },
}: {
    searchParams: { amount: string }
}) {
    return (
        <section
            id="about"
            className="bg-gradient-to-b from-hrqColors-skyBlue-200 to-hrqColors-skyBlue-400 py-16 md:py-24 lg:py-32 min-h-screen"
        >
            <main className=" max-w-6xl mt-60 mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
                    <h2 className="text-2xl">You successfully sent</h2>

                    <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
                        ${amount}
                    </div>
                    <p className="text-gray-600 mt-10">
                        Thank you for your purchase. Your test results are now
                        available.
                    </p>
                    <Button>View your results</Button>
                </div>
            </main>
            )
        </section>
    )
}
