import Image from "next/image"
import Link from "next/link"
import { FileQuestion, Home } from "lucide-react"

import { Button } from "@components/shadcn-ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@components/shadcn-ui/card"

export default function ProductNotFound() {
    return (
        <div className="container flex items-center justify-center min-h-screen px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <FileQuestion className="w-16 h-16 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-center text-2xl font-bold">Oops! Product Not Found</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Not Found Illustration"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <p className="text-muted-foreground">
                        We couldn't find the product you're looking for. It might have been moved or doesn't exist.
                    </p>
                </CardContent>
                {/* <CardFooter className="flex justify-center">
                    <Button asChild>
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go back home
                        </Link>
                    </Button>
                </CardFooter> */}
            </Card>
        </div>
    )
}