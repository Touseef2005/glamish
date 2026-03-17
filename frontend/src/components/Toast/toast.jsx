"use client"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, X, AlertCircle, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export const Toast = () => {
    const { toasts, dismiss } = useToast()

    useEffect(() => {
        toasts.forEach((t) => {
            const timer = setTimeout(() => dismiss(t.id), t.duration)
            return () => clearTimeout(timer)
        })
    }, [toasts, dismiss])

    if (!toasts.length) return null

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <AnimatePresence>
                {toasts.map((toast, index) => (
                    <motion.div
                        key={toast.id}
                        layout
                        initial={{
                            x: 100,
                            opacity: 0,
                            scale: 0.8
                        }}
                        animate={{
                            x: 0,
                            opacity: 1 - index * 0.2,
                            scale: 1 - index * 0.05,
                            y: -index * 20
                        }}
                        exit={{
                            x: 200,
                            opacity: 0,
                            transition: { duration: 0.2 }
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 15
                        }}
                        className="absolute flex items-center w-96 p-4 bg-white border rounded-lg shadow-lg"
                        style={{
                            bottom: `${index * 4}px`,
                            right: `${index * 4}px`,
                            zIndex: 1000 - index
                        }}
                    >
                        <div className="flex-shrink-0">
                            {toast.variant === "success" && <CheckCircle className="h-6 w-6 text-green-500" />}
                            {toast.variant === "error" && <AlertCircle className="h-6 w-6 text-red-500" />}
                            {!toast.variant && <Info className="h-6 w-6 text-blue-500" />}
                        </div>

                        <div className="ml-3 flex-1">
                            {toast.title && <p className="font-medium">{toast.title}</p>}
                            {toast.description && (
                                <p className="mt-1 text-sm text-gray-500">{toast.description}</p>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => dismiss(toast.id)}
                            className="ml-4 p-1 text-gray-400 hover:text-gray-500"
                        >
                            <X className="h-5 w-5" />
                        </motion.button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}