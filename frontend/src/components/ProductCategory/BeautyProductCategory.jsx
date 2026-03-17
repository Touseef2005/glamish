'use client'

import React, { useMemo, memo } from "react"
import Link from "next/link"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/shadcn-ui/card"
import { AnimatePresence, motion } from "framer-motion"

export const CategorySection = memo(function CategorySection({
    title,
    description,
    categories,
    viewAllHref,
    layout = "grid",
    columns = { sm: 2, md: 2, lg: 3 },
    className,
    ...props
}) {
    const gridClasses = useMemo(() => cn(
        "grid gap-4",
        columns.sm === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
        columns.md && `md:grid-cols-${columns.md}`,
        columns.lg && `lg:grid-cols-${columns.lg}`,
    ), [columns.sm, columns.md, columns.lg])

    const memoizedCategories = useMemo(() => categories.map(category => ({
        ...category,
        href: category.href || '#',
        ariaLabel: `View ${category.title} products`
    })), [categories])

    return (
        <section className={cn("space-y-6", className)} itemScope itemType="http://schema.org/ItemList" {...props}>
            <meta itemProp="name" content={title} />
            {description && <meta itemProp="description" content={description} />}

            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 itemProp="category" className="font-quicksand text-2xl font-bold tracking-tight">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-muted-foreground" itemProp="abstract">
                            {description}
                        </p>
                    )}
                </div>
                {viewAllHref && (
                    <Link
                        href={viewAllHref}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        aria-label={`View all ${title} categories`}
                    >
                        View all <ChevronRight className="h-4 w-4" />
                    </Link>
                )}
            </div>

            {layout === "grid" ? (
                <div className={gridClasses} role="list">
                    {memoizedCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            ) : (
                <div className="space-y-2" role="list">
                    {memoizedCategories.map((category) => (
                        <CategoryListItem key={category.id} category={category} />
                    ))}
                </div>
            )}
        </section>
    )
})

const CategoryCard = memo(({ category }) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <article
            className="relative overflow-hidden transition-colors hover:border-primary/50 flex flex-col"
            role="listitem"
            itemScope
            itemType="http://schema.org/Product"
        >
            <Link
                href={category.href}
                className="block h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label={category.ariaLabel}
            >
                <AnimatePresence>
                    {isHovered && (
                        <motion.span
                            className="absolute inset-0 -z-50 bg-gray-500 dark:bg-slate-800/80"
                            layoutId={`category-hover-${category.id}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        />
                    )}
                </AnimatePresence>

                <Card className="flex flex-col h-full">
                    <CardHeader className={cn(
                        "flex flex-row items-center gap-2",
                        category.color && `bg-${category.color}/10`
                    )}>
                        {category.icon && (
                            <div className="shrink-0" aria-hidden="true">
                                {category.icon}
                            </div>
                        )}
                        <div>
                            <CardTitle itemProp="name">
                                {category.title}
                            </CardTitle>
                            {category.description && (
                                <CardDescription itemProp="description">
                                    {category.description}
                                </CardDescription>
                            )}
                        </div>
                    </CardHeader>

                    <div className="flex-grow" aria-hidden="true" />

                    {category.count !== undefined && (
                        <CardFooter className="border-t bg-muted/50 px-4 py-2 mt-auto">
                            <p className="text-sm text-muted-foreground" itemProp="additionalProperty">
                                {category.count} items
                            </p>
                        </CardFooter>
                    )}
                </Card>
            </Link>
        </article>
    )
})

const CategoryListItem = memo(({ category }) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <article
            className={cn(
                "group relative flex items-center justify-between rounded-lg border p-3",
                category.color && `border-${category.color}/20`
            )}
            role="listitem"
            itemScope
            itemType="http://schema.org/Product"
        >
            <Link
                href={category.href}
                className="w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label={category.ariaLabel}
            >
                <AnimatePresence>
                    {isHovered && (
                        <motion.span
                            className="absolute inset-0 -z-10 block h-full w-full rounded-lg bg-neutral-100 dark:bg-slate-800/60"
                            layoutId={`hoverBackground-${category.id}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        />
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-3">
                    {category.icon && (
                        <div className="shrink-0" aria-hidden="true">
                            {category.icon}
                        </div>
                    )}
                    <div>
                        <h3 className="font-medium" itemProp="name">
                            {category.title}
                        </h3>
                        {category.description && (
                            <p className="text-sm text-muted-foreground" itemProp="description">
                                {category.description}
                            </p>
                        )}
                    </div>
                </div>
                {category.count !== undefined && (
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground" itemProp="additionalProperty">
                            {category.count}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    </div>
                )}
            </Link>
        </article>
    )
})