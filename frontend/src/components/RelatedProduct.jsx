"use client"

import { useState, useRef, useEffect, useCallback, memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn-ui/button"
import { useApiCache } from "@/hooks"
import { ApiService } from "@/utils"
import CosmeticLoader from "@components/Loader/CosmeticLoader"

const ProductCard = memo(({ product }) => (
    <div className="min-w-[240px] sm:min-w-[260px] snap-start snap-always">
        <div className="group relative flex flex-col gap-2 h-full">
            <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden rounded-xl bg-muted/50">
                <Image
                    src={product.images[0]?.url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 240px, 260px"
                    className="object-cover transition-transform group-hover:scale-105"
                    priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <Link
                href={`/product/${product._id}`}
                className="group-hover:underline mt-2"
            >
                <h3 className="font-medium line-clamp-1 text-sm sm:text-base">
                    {product.name.split(" ").slice(0, 4).join(" ")}
                    {product.name.split(" ").length > 4 && " ..."}
                </h3>
            </Link>
            <div className="flex items-center justify-between mt-1">
                <p className="font-medium text-sm sm:text-base">
                    Rs {product.price}
                </p>
            </div>
        </div>
    </div>
));

function RelatedProducts({ currentCategory = "skincare" }) {
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)
    const scrollContainerRef = useRef(null)
    const scrollTimeout = useRef(null)
    const touchStartRef = useRef({ x: 0, y: 0 })
    const isHorizontalSwipe = useRef(false)
    const rafId = useRef(null)

    const { data: relatedProducts, loading } = useApiCache(
        `product/get-published?category=${currentCategory}`,
        () => ApiService('GET', `product/get-published?category=${currentCategory}`).then(res => res.data?.products || [])
    )


    const updateArrowsVisibility = useCallback(() => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setShowLeftArrow(scrollLeft > 5)
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5)
    }, [])

    const handleScroll = useCallback(() => {
        if (rafId.current) cancelAnimationFrame(rafId.current)
        rafId.current = requestAnimationFrame(updateArrowsVisibility)
    }, [updateArrowsVisibility])

    const handleTouchStart = useCallback(e => {
        const touch = e.touches[0]
        touchStartRef.current.x = touch.clientX
        touchStartRef.current.y = touch.clientY
        isHorizontalSwipe.current = false
    }, [])

    const handleTouchMove = useCallback(e => {
        const touch = e.touches[0]
        const deltaX = touch.clientX - touchStartRef.current.x
        const deltaY = touch.clientY - touchStartRef.current.y

        isHorizontalSwipe.current = Math.abs(deltaX) > Math.abs(deltaY)
    }, [])

    const handleTouchEnd = useCallback(() => {
        const scrollContainer = scrollContainerRef.current
        if (scrollContainer) {
            scrollContainer.style.touchAction = isHorizontalSwipe.current
                ? "pan-x"
                : "pan-y"
        }
    }, [])

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current
        if (!scrollContainer) return

        const options = { passive: true }
        scrollContainer.addEventListener("scroll", handleScroll, options)
        scrollContainer.addEventListener("touchstart", handleTouchStart, options)
        scrollContainer.addEventListener("touchmove", handleTouchMove, options)
        scrollContainer.addEventListener("touchend", handleTouchEnd)

        return () => {
            scrollContainer.removeEventListener("scroll", handleScroll)
            scrollContainer.removeEventListener("touchstart", handleTouchStart)
            scrollContainer.removeEventListener("touchmove", handleTouchMove)
            scrollContainer.removeEventListener("touchend", handleTouchEnd)
            if (rafId.current) cancelAnimationFrame(rafId.current)
        }
    }, [handleScroll, handleTouchStart, handleTouchMove, handleTouchEnd])

    const scroll = useCallback(direction => {
        const scrollContainer = scrollContainerRef.current
        if (!scrollContainer) return

        const { clientWidth } = scrollContainer
        const scrollAmount = direction === "left" ? -clientWidth : clientWidth

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current)

        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        })

        scrollTimeout.current = setTimeout(() => {
            updateArrowsVisibility()
        }, 500)
    }, [updateArrowsVisibility])

    return (
        <section className="w-full py-12 bg-gradient-to-b from-background to-muted/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-serif font-medium tracking-tight !font-poppins">
                            You May Also Like
                        </h2>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className={cn(
                                    "rounded-full border-muted-foreground/20 transition-opacity",
                                    !showLeftArrow && "opacity-50 cursor-not-allowed"
                                )}
                                onClick={() => scroll("left")}
                                disabled={!showLeftArrow}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Scroll left</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className={cn(
                                    "rounded-full border-muted-foreground/20 transition-opacity",
                                    !showRightArrow && "opacity-50 cursor-not-allowed"
                                )}
                                onClick={() => scroll("right")}
                                disabled={!showRightArrow}
                            >
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Scroll right</span>
                            </Button>
                        </div>
                    </div>

                    {loading && <CosmeticLoader />}

                    <div className="relative">
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory"
                            style={{ touchAction: "pan-x" }}
                        >
                            {relatedProducts?.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default memo(RelatedProducts)