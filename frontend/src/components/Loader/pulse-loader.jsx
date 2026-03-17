"use client"

import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { cn } from "@/lib/utils"
import { Card } from "@/components/shadcn-ui/card"

export function PulseLoader({ className, variant = "default" }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Create a 3x3 grid of elements
  const gridItems = Array.from({ length: 9 }, (_, i) => i)

  // Calculate animation delay based on position
  const getAnimationDelay = (index) => {
    // Create a wave pattern animation
    const row = Math.floor(index / 3)
    const col = index % 3
    const distance = Math.abs(1 - row) + Math.abs(1 - col) // Distance from center
    return `${distance * 0.1}s`
  }

  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-br from-black to-black/40 border-0";
      case "outline":
        return "bg-background border border-black/50";
      default:
        return "bg-black hover:bg-black/70";
    }
  }

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <div className="grid grid-cols-3 gap-1.5">
        {gridItems.map((index) => (
          <Card
            key={index}
            className={cn("h-4 w-4 rounded-sm transition-all duration-700", getVariantClasses(), "animate-pulse")}
            style={{
              animationDelay: getAnimationDelay(index),
              animationDuration: "1.5s",
            }}
          />
        ))}
      </div>
    </div>
  )
}

PulseLoader.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "gradient", "outline"]),
}
