"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, Lock, Mail } from "lucide-react"
import { Button } from "@/components/shadcn-ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn-ui/card"
import { Input } from "@/components/shadcn-ui/input"
import { Label } from "@/components/shadcn-ui/label"
import { ApiService } from "@/utils"
import Link from "next/link"
import { Alert, AlertDescription } from "../shadcn-ui/alert"

export default function PasswordResetForm() {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email) {

            try {
                setLoading(true)
                const res = await ApiService("POST", "auth/forget", { email });
                console.log(res)
                if (res.status == 1) {
                    setSubmitted(true)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                console.log(error)
                setError(error.message || "Something went wrong")
            }

        }
    }

    if (submitted) {
        return (
            <Card className="border-none shadow-lg">
                <CardHeader className="space-y-1">
                    <div className="mx-auto bg-emerald-100 p-3 rounded-full">
                        <CheckCircle className="h-8 w-8 text-emerald-600" />
                    </div>
                    <CardTitle className="text-2xl text-center">Check Your Email</CardTitle>
                    <CardDescription className="text-center">
                        We've sent a password reset link to <span className="font-medium">{email}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                    <p>If you don't see the email in your inbox, please check your spam folder.</p>
                    <p className="mt-2">The link will expire in 60 minutes.</p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
                        Back to Reset Form
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
                <div className="mx-auto bg-orange-100 p-3 rounded-full">
                    <Lock className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
                <CardDescription className="text-center">
                    Enter your email address and we'll send you a link to reset your password
                </CardDescription>
                {error && (
                    <Alert variant="destructive" className="text-center !mt-3 bg-amber-50 text-red-600 border-none">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700"
                        >
                            Reset Password
                            {loading ? (
                                <ArrowRight className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <ArrowRight className="mr-2 h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
                <p className="text-sm text-muted-foreground">
                    Remember your password?{" "}
                    <Link href="/Login" className="text-orange-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
