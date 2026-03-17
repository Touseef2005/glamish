"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight, Palette, Scissors, Droplets, ShowerHeadIcon as Shower, Brush, Waves } from "lucide-react"


const productCategories = [
    {
        id: 1,
        name: "Facewash",
        description: "Cleansers, scrubs, and face washes",
        icon: Waves,
        color: "bg-cyan-50",
        textColor: "text-cyan-600 dark:text-cyan-400",
        borderColor: "border-cyan-200 dark:border-cyan-800",
        hoverColor: "group-hover:bg-cyan-200 hover:!text-white dark:group-hover:bg-cyan-900",
        href: "/categories?category=face wash",
    },
    {
        id: 2,
        name: "Makeup",
        description: "Foundations, lipsticks, and eye products",
        icon: Palette,
        color: "bg-pink-50 dark:bg-pink-950",
        textColor: "text-pink-600 dark:text-pink-400",
        borderColor: "border-pink-200 dark:border-pink-800",
        hoverColor: "group-hover:bg-pink-100 dark:group-hover:bg-pink-900",
        href: "/categories?category=makeup",
    },
    {
        id: 3,
        name: "Haircare",
        description: "Shampoos, conditioners, and styling",
        icon: Scissors,
        color: "bg-amber-50 dark:bg-amber-950",
        textColor: "text-amber-600 dark:text-amber-400",
        borderColor: "border-amber-200 dark:border-amber-800",
        hoverColor: "group-hover:bg-amber-100 dark:group-hover:bg-amber-900",
        href: "/categories?category=haircare",
    },
    {
        id: 4,
        name: "Fragrances",
        description: "Perfumes, colognes, and body mists",
        icon: Droplets,
        color: "bg-purple-50 dark:bg-purple-950",
        textColor: "text-purple-600 dark:text-purple-400",
        borderColor: "border-purple-200 dark:border-purple-800",
        hoverColor: "group-hover:bg-purple-100 dark:group-hover:bg-purple-900",
        href: "/categories?category=fragrance",
    },
    {
        id: 5,
        name: "Bath & Body",
        description: "Soaps, lotions, and body scrubs",
        icon: Shower,
        color: "bg-emerald-50 dark:bg-emerald-950",
        textColor: "text-emerald-600 dark:text-emerald-400",
        borderColor: "border-emerald-200 dark:border-emerald-800",
        hoverColor: "group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900",
        href: "/categories?category=bath & body",
    },
    {
        id: 6,
        name: "Tools & Accessories",
        description: "Brushes, sponges, and applicators",
        icon: Brush,
        color: "bg-rose-50 dark:bg-rose-950",
        textColor: "text-rose-600 dark:text-rose-400",
        borderColor: "border-rose-200 dark:border-rose-800",
        hoverColor: "group-hover:bg-rose-100 dark:group-hover:bg-rose-900",
        href: "/categories?category=tools & accessories",
    },
];
export default function CategorySection({ responsive }) {
    const [hoveredCategory, setHoveredCategory] = useState(null)
    const router = useRouter()

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    // Item animation variants
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                mass: 0.5,
            },
        },
    }

    return (
        <section className="w-full ">
            <div className="mx-auto">

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {productCategories.map((category) => (
                        <motion.div
                            key={category.id}
                            className="group relative"
                            variants={itemVariants}
                            onMouseEnter={() => setHoveredCategory(category.id)}
                            onMouseLeave={() => setHoveredCategory(null)}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <div
                                className={`h-full rounded-2xl border ${category.borderColor} overflow-hidden transition-all duration-300 ${hoveredCategory === category.id ? "shadow-lg" : "shadow-sm"}`}
                            >
                                <div
                                    className={`p-6 h-full flex flex-col ${category.color} transition-colors duration-300 ${category.hoverColor}`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-xl ${category.color} ${category.textColor}`}>
                                            <category.icon className="w-6 h-6" />
                                        </div>
                                        <motion.div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${category.textColor}`}
                                            animate={{
                                                x: hoveredCategory === category.id ? [0, 5, 0] : 0,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: hoveredCategory === category.id ? Number.POSITIVE_INFINITY : 0,
                                                repeatType: "reverse",
                                                repeatDelay: 1,
                                            }}
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.div>
                                    </div>
                                    <h3 className={`text-xl font-semibold mb-2 ${category.textColor}`}>{category.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
                                    <div className="mt-auto">
                                        <button
                                            className={`text-sm font-medium ${category.textColor} flex items-center gap-1 transition-all duration-300 group-hover:gap-2`}
                                            onClick={() => router.push(`${category.href}`)}
                                        >
                                            Explore {category.name} <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements that appear on hover */}
                            <motion.div
                                className={`absolute -z-10 rounded-full ${category.color} opacity-0 w-16 h-16 -bottom-4 -right-4`}
                                animate={{
                                    opacity: hoveredCategory === category.id ? 0.5 : 0,
                                    scale: hoveredCategory === category.id ? 1.2 : 0.8,
                                }}
                                transition={{ duration: 0.4 }}
                            />
                            <motion.div
                                className={`absolute -z-10 rounded-full ${category.color} opacity-0 w-8 h-8 -top-2 right-10`}
                                animate={{
                                    opacity: hoveredCategory === category.id ? 0.3 : 0,
                                    scale: hoveredCategory === category.id ? 1.1 : 0.7,
                                }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
