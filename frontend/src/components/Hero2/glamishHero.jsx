"use client"

import Image from "next/image"
import { Sparkles, Leaf } from "lucide-react"
import { Badge } from "@/components/shadcn-ui/badge"

export default function HeroSection() {

    return (
        <section className="relative overflow-hidden bg-orange-50 py-16 lg:py-24">
            <div className="absolute inset-0 opacity-40">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange-100/50 blur-3xl" />
                <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-yellow-100/50 blur-3xl" />
            </div>

            <div className="container relative z-10 mx-auto px-4 sm:px-6">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col justify-center space-y-6">
                        <div>
                            <Badge
                                variant="outline"
                                className="inline-flex items-center gap-1 border-orange-200 bg-orange-50 px-3 py-1 text-orange-700"
                            >
                                <Leaf className="h-3.5 w-3.5" />
                                <span>100% Organic Products</span>
                            </Badge>
                        </div>

                        <h1
                            className="font-poppins text-4xl font-bold leading-snug tracking-tight text-black sm:text-5xl md:text-6xl"

                        >
                            <span className="block">Luxurious</span>
                            <span className="relative inline-block pb-2">
                                Skincare
                                <span className="absolute bottom-0 left-0 h-1 w-full bg-orange-300" />
                            </span>
                            <span className="mt-1 text-gray-700"> &</span>
                            <span className="block" />
                            <span className="relative inline-block pb-2">
                                <span className="inline-flex items-center">
                                    Cosmetic
                                    <Sparkles className="ml-2 h-6 w-6 text-yellow-400" />
                                </span>
                                <span className="absolute bottom-0 left-0 h-1 w-full bg-orange-300" />
                            </span>
                            <span>Solutions</span>
                        </h1>

                        <p
                            className="max-w-2xl text-lg text-gray-700"

                        >
                            Discover our exclusive range of skincare and cosmetic products, formulated with organic ingredients to
                            enhance your natural beauty.
                        </p>
                    </div>

                    {/* Image Grid */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-3 md:gap-6">
                            <div
                                className="flex flex-col gap-3 md:gap-6 pt-12"
                            >
                                <div className="overflow-hidden rounded-2xl shadow-lg">
                                    <Image
                                        src="/Hero-Section/Hero-7.webp"
                                        width={400}
                                        height={300}
                                        alt="Luxury skincare products"
                                        className="h-48 w-full object-cover sm:h-64"
                                        priority
                                        loading="eager"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="overflow-hidden rounded-2xl shadow-lg">
                                    <Image
                                        src="/Hero-Section/Hero-8.webp"
                                        width={400}
                                        height={300}
                                        alt="Organic skincare creams"
                                        className="h-48 w-full object-cover sm:h-64"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                        loading="eager"
                                    />
                                </div>
                            </div>

                            <div
                                className="flex flex-col gap-3 md:gap-6"
                            >
                                <div className="overflow-hidden rounded-2xl shadow-lg">
                                    <Image
                                        src="/Hero-Section/Hero-3.webp"
                                        width={400}
                                        height={300}
                                        alt="Premium makeup products"
                                        className="h-48 w-full object-cover sm:h-64"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                        loading="eager"
                                    />
                                </div>
                                <div className="overflow-hidden rounded-2xl shadow-lg">
                                    <Image
                                        src="/Hero-Section/Hero-4.webp"
                                        width={400}
                                        height={300}
                                        alt="Makeup brushes and accessories"
                                        className="h-48 w-full object-cover sm:h-64"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                        loading="eager"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Floating Badges */}
                        <div
                            className="absolute -bottom-6 -left-6 hidden rounded-full bg-white p-4 shadow-xl md:block"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
                                <span className="text-center text-sm font-medium text-orange-700">Vegan</span>
                            </div>
                        </div>

                        <div
                            className="absolute -right-6 top-1/4 hidden rounded-full bg-white p-4 shadow-xl md:block"

                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
                                <span className="text-center text-sm font-medium text-yellow-700">Cruelty Free</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
