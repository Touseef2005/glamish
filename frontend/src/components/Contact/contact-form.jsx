"use client"


import { useState } from "react"
import { Button } from "@/components/shadcn-ui/button"
import { Input } from "@/components/shadcn-ui/input"
import { Textarea } from "@/components/shadcn-ui/textarea"
import { Label } from "@/components/shadcn-ui/label"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const [status, setStatus] = useState("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus("submitting")

        // Simulate form submission
        try {
            // Replace with actual form submission logic
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setStatus("success")
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            })
        } catch (error) {
            setStatus("error")
            setErrorMessage("Something went wrong. Please try again.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header Section */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h2>
                <p className="text-gray-600 max-w-lg mx-auto">
                    Have questions or want to collaborate? Send us a message and we'll respond promptly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-peach-500 to-orange-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <Label htmlFor="name" className="text-gray-700 font-medium">
                            Your Name
                        </Label>
                    </div>
                    <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-peach-500 focus:ring-2 focus:ring-peach-200 shadow-sm pl-12"
                    />
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-peach-500 to-orange-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                            Email Address
                        </Label>
                    </div>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-peach-500 focus:ring-2 focus:ring-peach-200 shadow-sm pl-12"
                    />
                </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-peach-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <Label htmlFor="subject" className="text-gray-700 font-medium">
                        Subject
                    </Label>
                </div>
                <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-peach-500 focus:ring-2 focus:ring-peach-200 shadow-sm pl-12"
                />
            </div>

            {/* Message Field */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-peach-500 to-orange-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <Label htmlFor="message" className="text-gray-700 font-medium">
                        Your Message
                    </Label>
                </div>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[180px] rounded-xl bg-white border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-peach-500 focus:ring-2 focus:ring-peach-200 shadow-sm pl-12"
                />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
                <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className={cn(
                        "w-full h-14 text-lg font-medium rounded-xl transition-all relative overflow-hidden group shadow-lg",
                        status === "success"
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-gradient-to-r from-peach-500 to-orange-500 hover:from-peach-600 hover:to-orange-600 text-white hover:shadow-md transform hover:-translate-y-0.5 transition-transform"
                    )}
                >
                    <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />

                    {status === "submitting" ? (
                        <>
                            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                            Sending Your Message...
                        </>
                    ) : status === "success" ? (
                        <>
                            <CheckCircle2 className="mr-3 h-5 w-5" />
                            Message Sent Successfully!
                        </>
                    ) : (
                        <>
                            <Send className="mr-3 h-5 w-5" />
                            Send Message
                        </>
                    )}
                </Button>
            </div>

            {/* Status Messages */}
            {status === "error" && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
            )}

            {status === "success" && (
                <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-green-700 text-sm">
                        Thank you for your message! We've received it and will get back to you within 24 hours.
                    </p>
                </div>
            )}
        </form>
    )
}

