"use client"

import { Button } from "@components/shadcn-ui/button";
import TextInput from "@components/Inputs/TextInput";
import { motion } from "framer-motion";
import { useState } from "react";
import { ButtonPrimaryWithIcon } from "./Buttons";
import { BellDot } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ApiService } from "@/utils";

export default function NewsLetter({ title, description, placeholder, buttonText }) {

    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSendEmail = async () => {
        if (email == "") {
            setError("Please enter your email")
            return
        }

        try {
            setError("")
            setLoading(true)
            const res = await ApiService("POST", `subscribe`, { email });
            // console.log(res)
            if (res.message == "You are already subscribed") {
                setError(res.message)
                setLoading(false)
            } else {
                setEmail("")
                toast({
                    title: "Thanks for subscribing!",
                    description: `You have successfully subscribed to our newsletter. We will keep you updated with the latest beauty news and offers.`,
                })
                setLoading(false)
                setError("")
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            setError(error.message || "Something went wrong")
        }


    }

    return (
        <motion.div
            className="relative mb-16 overflow-hidden rounded-xl bg-gradient-to-r from-amber-50 to-peach-100 p-8 md:p-12 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-200/50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
            />
            <motion.div
                className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-peach-200/40"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
            />

            <div className="relative z-10 max-w-xl mx-auto text-center">
                <motion.h3
                    className="mb-2 text-2xl font-bold tracking-tight text-gray-900"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {title || "Join our beauty community"}
                </motion.h3>
                <motion.p
                    className="mb-6 text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {description || "Subscribe to our newsletter for exclusive offers, beauty tips, and new product announcements."}
                </motion.p>

                <motion.div
                    className="flex flex-col gap-2 sm:flex-row justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <div>
                        <TextInput
                            type="email"
                            name={"email"}
                            placeholder={placeholder || "Enter your email"}
                            className="border-amber-200 bg-white/80 backdrop-blur-sm focus:ring-peach-500 focus:border-peach-500"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <ButtonPrimaryWithIcon
                        title="Subscribe"
                        className="!bg-peach-500 hover:!bg-peach-600 !text-white px-6 py-2 !border-none !shadow-md transition-transform transform hover:scale-105"
                        icon={<BellDot />}
                        onButtonClick={handleSendEmail}
                        disabled={loading}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}