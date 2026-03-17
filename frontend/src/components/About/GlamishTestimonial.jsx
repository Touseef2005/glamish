import Image from "next/image";
import { Card, CardContent } from "@/components/shadcn-ui/card"

export default function GlamishTestimonial() {
    return (
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">What Our Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-pink-100 dark:border-pink-900">
                    <CardContent className="pt-6">
                        <div className="flex items-center mb-4">
                            <div className="text-amber-400 flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-star"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        <p className="italic text-slate-700 dark:text-slate-300 mb-4">
                            "I've tried countless skincare products, but nothing compares to this brand. My skin has never looked
                            better, and I love knowing that I'm using products that are good for me and the environment."
                        </p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-pink-100">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1684407616442-8d5a1b7c978e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Customer"
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Sarah M.</p>
                                <p className="text-xs text-slate-500">Loyal customer since 2018</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-pink-100 dark:border-pink-900">
                    <CardContent className="pt-6">
                        <div className="flex items-center mb-4">
                            <div className="text-amber-400 flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-star"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        <p className="italic text-slate-700 dark:text-slate-300 mb-4">
                            "As someone with sensitive skin, finding products that don't cause irritation has always been a
                            challenge. This brand has been a game-changer for me. Everything I've tried has been gentle yet
                            effective."
                        </p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-pink-100">
                                <Image
                                    src="https://plus.unsplash.com/premium_photo-1684407616442-8d5a1b7c978e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Customer"
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Michael T.</p>
                                <p className="text-xs text-slate-500">Loyal customer since 2020</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-pink-100 dark:border-pink-900">
                    <CardContent className="pt-6">
                        <div className="flex items-center mb-4">
                            <div className="text-amber-400 flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-star"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        <p className="italic text-slate-700 dark:text-slate-300 mb-4">
                            "I appreciate that this brand is transparent about their ingredients and manufacturing processes. It's
                            rare to find a company that truly cares about both their customers and the planet."
                        </p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-pink-100">
                                <Image
                                    src="https://plus.unsplash.com/premium_photo-1684407616442-8d5a1b7c978e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Customer"
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Priya K.</p>
                                <p className="text-xs text-slate-500">Loyal customer since 2019</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}