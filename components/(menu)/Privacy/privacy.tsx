import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SectionTitle from '@/components/common/section-title'

export default function Privacy() {
    return (
        <section id="privacy" className="-mt-20  bg-hrqColors-sunsetOrange-400 py-16 md:py-20 lg:py-28">
            <div className="container mx-auto px-4">
                <SectionTitle
                    title="Privacy"
                    paragraph="What you tell us is between you and HighRQ. Your details will never be shared with anyone without your explicit and specific permission."
                    center
                />
                <Card className="-mt-16 bg-white shadow-lg">
                    <CardHeader className="bg-indigo-700 text-white">
                        <CardTitle className="text-2xl font-bold">HighRQ Privacy Policy</CardTitle>
                        <CardDescription className="text-indigo-100">Learn about how we protect your information and respect your privacy</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6 text-slate-700">
                        <section>
                            <h3 className="text-xl font-semibold mb-2 text-indigo-800">Security Measures</h3>
                            <p>
                                HighRQ has extensive security measures in place to protect the loss, misuse, and alteration of the information stored in our database. These measures include:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Use of Secure Socket Layer (SSL)</li>
                                <li>Strong encryption (3DES) technology during credit card transactions</li>
                                <li>Secure administrative access to site data</li>
                                <li>Proprietary security measures for all repositories and transfers of user information</li>
                            </ul>
                            <p className="mt-2">
                                While we exercise reasonable care in providing secure transmission of information, we cannot guarantee 100% security for information transmitted over the Internet.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold mb-2 text-indigo-800">Use of Cookies and Similar Technologies</h3>
                            <p>HighRQ uses cookies and similar technologies to:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Authenticate users</li>
                                <li>Remember preferences and settings</li>
                                <li>Analyze site traffic and trends</li>
                                <li>Deliver and measure advertising campaigns</li>
                                <li>Enable social features</li>
                            </ul>
                            <p className="mt-2">
                                You agree to allow HighRQ to use, share, or permit third-party advertising networks to collect this information for targeted advertising and analysis purposes.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold mb-2 text-indigo-800">Profile Information</h3>
                            <p>When completing your HighRQ profile, you can share additional information such as:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Personality details</li>
                                <li>Lifestyle information</li>
                                <li>Interests</li>
                                <li>Photos and videos</li>
                            </ul>
                            <p className="mt-2">
                                Some information may be considered &quot;special&quot; or &quot;sensitive&quot; in certain jurisdictions. By providing this information, you consent to HighRQ processing it.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold mb-2 text-indigo-800">Data Collection and Use</h3>
                            <p>HighRQ collects various types of information, including:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Personal details (name, birth date, gender, etc.)</li>
                                <li>Contact information</li>
                                <li>Billing information</li>
                                <li>Demographic information</li>
                                <li>User preferences and interests</li>
                                <li>Usage data and interactions with the service</li>
                            </ul>
                            <p className="mt-2">
                                This information is used to provide and improve our services, communicate with users, and personalize experiences.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold mb-2 text-indigo-800">Data Sharing and Disclosure</h3>
                            <p>HighRQ may share your information in the following circumstances:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>With third-party service providers assisting with various tasks</li>
                                <li>In the event of a merger, acquisition, or restructuring</li>
                                <li>To comply with legal processes or protect our legal rights</li>
                            </ul>
                            <p className="mt-2">
                                We retain personal information only as long as necessary for legitimate business purposes or to comply with applicable law.
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}