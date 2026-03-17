import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { memo } from "react"
import { Button } from "@components/shadcn-ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const ImageCarousel = memo(({ images, activeImage, direction, setActiveImage }) => {
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0
        })
    }

    return (
        <div className="relative mb-4 rounded-xl overflow-hidden bg-gray-50 aspect-square">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={activeImage}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[activeImage].url}
                        alt={images[activeImage]._id}
                        fill
                        className="object-contain"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center justify-between px-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 rounded-full h-8 w-8"
                    onClick={() => setActiveImage("prev")}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 rounded-full h-8 w-8"
                    onClick={() => setActiveImage("next")}
                >
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-2 h-2 rounded-full transition-colors",
                            activeImage === index ? "bg-primary" : "bg-gray-300"
                        )}
                        onClick={() => setActiveImage(index)}
                    />
                ))}
            </div>
        </div>
    )
})

export default ImageCarousel