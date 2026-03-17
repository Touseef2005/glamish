"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Sparkles, Shield, Leaf, ArrowRight } from "lucide-react"
import { Button } from "@/components/shadcn-ui/button"
import { Card, CardContent } from "@/components/shadcn-ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn-ui/tabs"
import GlamishCTA from "./GlamishCta"
import GlamishTestimonial from "./GlamishTestimonial"
import { useRouter } from "next/navigation"

export default function AboutUs() {
    const [activeTab, setActiveTab] = useState("story")
    const router = useRouter()

    const brandValues = [
        {
            icon: <Leaf className="h-8 w-8 text-emerald-500" />,
            title: "Natural Ingredients",
            description:
                "We source only the finest natural ingredients, ensuring our products are gentle on your skin and the environment.",
        },
        {
            icon: <Shield className="h-8 w-8 text-peach-400" />,
            title: "Cruelty-Free",
            description:
                "We are proudly cruelty-free and never test our products on animals. Beauty should never come at their expense.",
        },
        {
            icon: <Sparkles className="h-8 w-8 text-amber-400" />,
            title: "Quality Assurance",
            description:
                "Every product undergoes rigorous testing to ensure it meets our high standards of quality and effectiveness.",
        },
        {
            icon: <Heart className="h-8 w-8 text-pink-500" />,
            title: "Self-Love",
            description:
                "We believe beauty starts with self-love and confidence. Our products are designed to enhance your natural beauty.",
        },
    ]

    const teamMembers = [
        {
            name: "Fahad Alam",
            role: "Founder & Creative Director",
            image: "/developer-images/fahad.png",
            phone: "+923272748498",
        },
        {
            name: "Touseef Abid",
            role: "Lead Formulator",
            image: "/developer-images/touseef.jpg",
            phone: "+923102939875",
        },
        {
            name: "Zain Badar",
            role: "Beauty Expert",
            image: "/developer-images/zain.jpg",
            phone: "+923232624511",
        },
    ]

    const handleWhatsAppClick = (member) => {
        const phoneNumber = member.phone;  // Replace with your desired phone number
        const message = encodeURIComponent(`Hello, I want some information about the product: ${member.name}`);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="container mx-auto px-4 py-16">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-peach-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 p-8 md:p-16 mb-16">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -inset-[10px] bg-[linear-gradient(90deg,#9b2c2c_1px,transparent_1px),linear-gradient(180deg,#9b2c2c_2px,transparent_1px)] blur-[1px] bg-[size:24px_24px]"></div>
                </div>
                <div className="relative z-10 max-w-3xl">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Beauty with{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-peach-500">Purpose</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-slate-700 dark:text-slate-300 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Founded with a passion for natural beauty and self-care, our brand has been creating premium cosmetic
                        products that enhance your natural beauty while being kind to your skin and the planet.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-pink-400 to-peach-500 hover:from-pink-500 hover:to-peach-600 text-white"
                            onClick={() => router.push("/products")}
                        >
                            Discover our products <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
                    <motion.div
                        className="absolute bottom-0 right-0 w-full h-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <div className="relative w-full h-full">
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-600 rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute top-0 left-0 w-32 h-32 bg-peach-300 rounded-full filter blur-2xl opacity-20"></div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="mb-16">
                <Tabs defaultValue="values" className="w-full" onValueChange={setActiveTab}>
                    <div className="flex justify-center mb-8">
                        <TabsList className="grid grid-cols-2 w-full max-w-md">
                            <TabsTrigger value="values">Our Values</TabsTrigger>
                            <TabsTrigger value="team">Our Team</TabsTrigger>
                        </TabsList>
                    </div>


                    <TabsContent value="values">
                        <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Our Core Values</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {brandValues.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Card className="h-full hover:shadow-lg transition-shadow border-pink-100 dark:border-pink-900">
                                        <CardContent className="pt-6">
                                            <div className="mb-4">{value.icon}</div>
                                            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{value.title}</h3>
                                            <p className="text-slate-700 dark:text-slate-300">{value.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>


                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                            <div className="text-center p-4">
                                <div className="text-4xl font-bold text-peach-500">50+</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">Natural Products</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-4xl font-bold text-peach-500">100%</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">Cruelty-Free</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-4xl font-bold text-peach-500">25+</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">Countries Served</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-4xl font-bold text-peach-500">500K+</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">Happy Customers</div>
                            </div>
                        </div>

                        <div className="mt-10 bg-gradient-to-r from-peach-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-8">
                            <div className="max-w-3xl mx-auto text-center">
                                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Promise</h3>
                                <p className="text-slate-700 dark:text-slate-300 mb-6">
                                    We promise to always prioritize your skin's health and the planet's wellbeing. Every product we create
                                    is formulated with intention, using ingredients that are effective, sustainable, and ethically
                                    sourced.
                                </p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="team">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Meet Our Team</h2>
                            <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
                                Our passionate team of beauty experts, formulators, and skincare enthusiasts work together to create
                                products that make you look and feel your best.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <div className="group">
                                        <div className="relative overflow-hidden rounded-2xl mb-4">
                                            <div className="aspect-[3/4] bg-amber-200 dark:bg-slate-800">
                                                <img
                                                    src={member.image || "/placeholder.svg"}
                                                    alt={member.name}
                                                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                                                <div className="p-4 w-full text-white">
                                                    <Button variant="secondary" size="sm" className="w-full"
                                                        onClick={() => handleWhatsAppClick(member)}
                                                    >
                                                        Contact on WhatsApp
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{member.name}</h3>
                                        <p className="text-sm text-peach-500">{member.role}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </TabsContent>
                </Tabs>
            </div>

            {/* Testimonials Section */}
            <GlamishTestimonial />

            {/* CTA Section */}
            <GlamishCTA />
        </div>
    )
}

