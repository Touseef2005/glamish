import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

import { Separator } from "@components/shadcn-ui/separator"

export default function CosmeticFooter() {
    return (
        <footer className="bg-white/50 pt-4 pb-8 relative z-10 rounded-lg mt-5 ">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col">
                        <h2 className="mb-4 text-lg font-bold">BEAUTY</h2>
                        <p className="mb-6 text-sm text-gray-600">
                            Discover the perfect blend of science and nature with our premium cosmetic products designed for all skin
                            types.
                        </p>
                        <div className="mt-auto flex space-x-4">
                            <Link
                                href="#"
                                className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-rose-100 hover:text-rose-500"
                            >
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link
                                href="#"
                                className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-rose-100 hover:text-rose-500"
                            >
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link
                                href="#"
                                className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-rose-100 hover:text-rose-500"
                            >
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="#"
                                className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-rose-100 hover:text-rose-500"
                            >
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </Link>
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/categories?category=skincare" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Skincare
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories?category=makeup" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Makeup
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories?category=haircare" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Hair Care
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories?category=bodybath" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Body & Bath
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories?category=fragrance" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Fragrance
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories?category=giftsets" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Gift Sets
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about-us" className="text-gray-600 transition-colors hover:text-rose-500">
                                    About Us
                                </Link>
                            </li>
                            {/* <li>
                                <Link href="/contact-us" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Contact Us
                                </Link>
                            </li> */}
                            <li>
                                <Link href="#" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Press
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Help</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/contact-us" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 transition-colors hover:text-rose-500">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 transition-colors hover:text-rose-500">
                                    Store Locator
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <Separator className="my-8 bg-gray-200" />

                <div className="flex flex-col justify-between gap-4 text-sm text-gray-500 md:flex-row">
                    <p>© {new Date().getFullYear()} Beauty Cosmetics. All rights reserved.</p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="#" className="hover:text-rose-500">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-rose-500">
                            Terms of Service
                        </Link>
                        <Link href="#" className="hover:text-rose-500">
                            Cookie Settings
                        </Link>
                        <Link href="#" className="hover:text-rose-500">
                            Accessibility
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

