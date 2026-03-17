"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { useResponsive } from "@/hooks";

export function ProductSlider({
    children,
    className,
    itemClassName,
    showArrows = true,
    autoplay = false,
    autoplayInterval = 3000,
    slidesToShow = 4,
    gap = 16,
}) {
    const sliderRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const smResponsive = useResponsive(576);
    const mdResponsive = useResponsive(1024);
    const lgResponsive = useResponsive(1280);

    const childrenArray = React.Children.toArray(children);
    const actualSlidesToShow = smResponsive ? 1 : (mdResponsive ? 2 : lgResponsive ? 3 : slidesToShow);

    // Custom throttle function
    const throttle = (func, limit) => {
        let lastFunc;
        let lastRan;
        return function () {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(() => {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    };

    const checkScrollability = throttle(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        setCanScrollLeft(slider.scrollLeft > 0);
        setCanScrollRight(slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 1);
    }, 100); // Throttling to run at max once every 100ms

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        checkScrollability(); // Initial check
        slider.addEventListener("scroll", checkScrollability);

        return () => {
            slider.removeEventListener("scroll", checkScrollability); // Cleanup scroll listener
        };
    }, [children]);

    useEffect(() => {
        if (!autoplay) return;

        const interval = setInterval(() => {
            if (!canScrollRight) {
                // Reset to beginning if we're at the end
                if (sliderRef.current) {
                    sliderRef.current.scrollLeft = 0;
                }
            } else {
                scrollToNext();
            }
        }, autoplayInterval);

        return () => clearInterval(interval); // Cleanup interval on unmount or autoplay change
    }, [autoplay, autoplayInterval, canScrollRight]);

    const scrollToPrev = () => {
        const slider = sliderRef.current;
        if (!slider) return;

        const itemWidth = slider.clientWidth / actualSlidesToShow;
        slider.scrollBy({ left: -itemWidth, behavior: "smooth" });
    };

    const scrollToNext = () => {
        const slider = sliderRef.current;
        if (!slider) return;

        const itemWidth = slider.clientWidth / actualSlidesToShow;
        slider.scrollBy({ left: itemWidth, behavior: "smooth" });
    };

    // Touch handling with useRef
    const touchStartRef = useRef(null);
    const touchEndRef = useRef(null);

    const handleTouchStart = (e) => {
        touchStartRef.current = e.targetTouches[0].clientX;
        touchEndRef.current = null;
    };

    const handleTouchMove = (e) => {
        touchEndRef.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartRef.current || !touchEndRef.current) return;

        const distance = touchStartRef.current - touchEndRef.current;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && canScrollRight) {
            scrollToNext();
        } else if (isRightSwipe && canScrollLeft) {
            scrollToPrev();
        }
    };

    return (
        <div className={cn("relative group", className)}>
            <div
                ref={sliderRef}
                className={cn("flex overflow-x-auto scrollbar-hide scroll-smooth", "snap-x snap-mandatory")}
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {React.Children.map(childrenArray, (child, index) => (
                    <div
                        key={index}
                        className={cn("flex-shrink-0 snap-start", itemClassName)}
                        style={{
                            width: `calc(${100 / actualSlidesToShow}% - ${(gap * (actualSlidesToShow - 1)) / actualSlidesToShow}px)`,
                            marginRight: index < childrenArray.length - 1 ? `${gap}px` : 0,
                        }}
                    >
                        {child}
                    </div>
                ))}
            </div>

            {showArrows && (
                <>
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm",
                            "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                            !canScrollLeft && "hidden",
                        )}
                        onClick={scrollToPrev}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm",
                            "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                            !canScrollRight && "hidden",
                        )}
                        onClick={scrollToNext}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </>
            )}
        </div>
    );
}
