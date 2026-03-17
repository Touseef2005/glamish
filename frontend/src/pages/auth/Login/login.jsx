"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/shadcn-ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn-ui/card"
import { Checkbox } from "@/components/shadcn-ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn-ui/form"
import { ApiService, localStorageHandler } from "@/utils/index"
import TextInput from "@/components/Inputs/TextInput"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';

// Form validation schema
const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    rememberMe: z.boolean().default(false),
})

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    // Form submission handler
    async function onSubmit(values) {
        setIsLoading(true)

        try {
            const res = await ApiService("POST", "auth/login", values);
            if (res.status === 1) {
                const data = localStorageHandler.set("user", res.data);
                Cookies.set('token', res.data.token, { expires: 1 }); 
                setIsLoading(false)
                router.refresh()
                router.back()
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-[80vh] bg-gray-50">
            {/* Left side image - hidden on mobile */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary/5 items-center justify-center">
                <div className="relative w-full max-w-md h-[60vh]">
                    <Image
                        src="/login2.jpg"
                        alt="Login illustration"
                        fill
                        className="object-cover rounded-lg shadow-lg "
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
                    <div className="absolute bottom-8 left-8 right-8 text-white">

                    </div>
                </div>
            </div>

            {/* Right side login form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
                        <CardDescription className="text-center">Enter your email and password to sign in</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <TextInput placeholder="name@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel >Password</FormLabel>
                                            <FormControl>
                                                <div>
                                                    <TextInput type="password" placeholder="••••••••" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center justify-between">
                                    <FormField
                                        control={form.control}
                                        name="rememberMe"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    Remember me
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="text-sm">
                                        <Link href="/Forget-Password" className="font-medium text-primary hover:text-primary/90">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign in"
                                    )}
                                </Button>
                            </form>
                        </Form>

                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <p className="text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="SignUp" className="font-medium text-primary hover:text-primary/90">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

