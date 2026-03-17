"use client"

import { useState } from "react"
import { CheckCircle, Eye, EyeOff, KeyRound } from "lucide-react"
import { Button } from "@/components/shadcn-ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn-ui/card"
import { Input } from "@/components/shadcn-ui/input"
import { Label } from "@/components/shadcn-ui/label"
import { Alert, AlertDescription } from "@/components/shadcn-ui/alert"
import { useParams, useRouter } from "next/navigation"
import { ApiService } from "@/utils"

export function NewPasswordForm() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const { token } = useParams()
    const router = useRouter()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Reset error
        setError("")

        // Validate password
        if (password.length < 8) {
            setError("Password must be at least 8 characters long")
            return
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            setLoading(true)
            const res = await ApiService("POST", `auth/reset/${token}`, { newPassword: password });
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

    if (submitted) {
        return (
            <Card className="border-none shadow-lg">
                <CardHeader className="space-y-1">
                    <div className="mx-auto bg-emerald-100 p-3 rounded-full">
                        <CheckCircle className="h-8 w-8 text-emerald-600" />
                    </div>
                    <CardTitle className="text-2xl text-center">Password Reset Complete</CardTitle>
                    <CardDescription className="text-center">Your password has been successfully reset</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                    <p>You can now use your new password to log in to your account.</p>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        onClick={() => (router.push("/Login"))}
                    >
                        Go to Login
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
                <div className="mx-auto bg-orange-100 p-3 rounded-full">
                    <KeyRound className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl text-center">Create New Password</CardTitle>
                <CardDescription className="text-center">Please enter and confirm your new password</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        {error && (
                            <Alert variant="destructive" className="bg-red-50 text-red-600 border-red-200">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pr-10"
                                    placeholder="Enter new password"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pr-10"
                                    placeholder="Confirm your password"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-orange-600 hover:bg-orange-700 mt-2"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Reset Password"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
