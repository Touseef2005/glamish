import { Sparkles } from "lucide-react"
import dynamic from "next/dynamic"

const ContactForm = dynamic(() => import("@/components/Contact/contact-form"))

export const metadata = {
    title: "Contact ",
    description: "Get in touch with Glamish Beauty! Have a question or want to collaborate? Reach out to us through email, phone, or visit us at our office."
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 overflow-auto scroll-smooth">
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-peach-50 to-gray-100" />

                <div className="absolute inset-0 opacity-80">
                    <div className="absolute top-[10%] left-[10%] w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full bg-peach-300/20 blur-[100px] animate-float-slow" />
                    <div className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] rounded-full bg-gray-300/15 blur-[80px] animate-float-medium" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[300px] max-h-[300px] rounded-full bg-peach-400/15 blur-[60px] animate-float-fast" />
                    <div className="absolute top-[15%] right-[15%] w-[30vw] h-[30vw] max-w-[200px] max-h-[200px] rounded-full bg-peach-200/20 blur-[50px] animate-float-slow" />
                </div>

                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmZUNvbXBvc2l0ZSBpbl9Tb3VyY2VHcmFwaGljPSJub2lzZSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsxPSIwIiBrMj0iMSIgazM9IjAiIGs0PSIwIi8+PC9zdmc+')] opacity-[0.02]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
                <div className="flex flex-col items-center mb-16">
                    <div className="inline-flex items-center justify-center p-2 px-5 bg-white/80 backdrop-blur-md rounded-full mb-6 shadow-sm">
                        <Sparkles className="h-5 w-5 text-peach-600 mr-2" />
                        <span className="text-sm font-medium text-peach-700">Let's Connect</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-peach-500 to-orange-400 mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-center text-gray-600 max-w-xl">
                        Have a question or want to work together? Reach out using one of the methods below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 flex justify-center !sticky top-20">
                        <div className="sticky top-20">
                            <div className="w-[310px] h-[380px] md:w-[350px] md:h-[380px]">
                                <div className=" absolute inset-0 bg-gradient-to-br from-white to-gray-100 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between border border-gray-200 shadow-lg">
                                    <div>
                                        <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
                                            <span className="bg-peach-100 p-2 rounded-lg mr-3">
                                                <svg
                                                    className="w-5 h-5 text-peach-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </span>
                                            Contact Info
                                        </h3>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-gray-500 text-sm mb-1">Email us at :</p>
                                            <p className="text-lg font-medium">touseefabid737@gmail.com</p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm mb-1">Call us at :</p>
                                            <p className="text-lg font-medium">+93 310 2939875</p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm mb-1">Visit our office :</p>
                                            <p className="text-lg font-medium">Gulshan-e-zia Orangi Town, main bismillah chock, Street 08</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
