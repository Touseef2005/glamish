import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@components/shadcn-ui/progress";

export function Loader({ size = "md", color = "black", className }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sizeClasses = {
    sm: "h-4 w-4 sm:h-2 sm:w-2", // Adjusted for small screens
    md: "h-8 w-6 sm:h-4 sm:w-3", // Adjusted for small screens
    lg: "h-24 w-6 sm:h-12 sm:w-4", // Adjusted for small screens
  };

  const colorClasses = {
    black: "text-black",
    white: "text-white",
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer circle */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-2 border-t-transparent animate-spin",
            colorClasses[color]
          )}
        />

        {/* Inner dots */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full",
              colorClasses[color],
              size === "sm" ? "h-1 w-1 sm:h-0.5 sm:w-0.5" : size === "md" ? "h-1.5 w-1.5 sm:h-1 sm:w-1" : "h-2 w-2 sm:h-1.5 sm:w-1.5",
              "animate-pulse"
            )}
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 120}deg) translateX(${size === "sm" ? "4px" : size === "md" ? "8px" : "12px"}) translateY(-50%)`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}


export function LoaderProgress({ progress }) {
  return (
      <div className="w-full max-w-md mx-auto space-y-4  ">
          <h2 className="text-2xl font-bold text-center">Loading... {progress}%</h2>
          <Progress value={progress} className="w-full" />
      </div>
  )
}