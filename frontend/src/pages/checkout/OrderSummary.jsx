"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn-ui/card"
import { Separator } from "@/components/shadcn-ui/separator"
import { Truck } from "lucide-react"


export default function OrderSummary({ checkoutSummary, cartItems }) {

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Order Summary
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Items</span>
                    <div className="flex items-center">
                        <p className="text-sm text-muted-foreground bg-transparent text-peach-300 border border-peach-300 p-1 font-bold px-2 rounded-md">
                            {cartItems?.length} {cartItems?.length === 1 ? "item" : "items"}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs. {checkoutSummary?.subTotal?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{checkoutSummary?.shippingCost === 0 ? "Free" : `Rs ${checkoutSummary?.shippingCost?.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax</span>
                    <span>Rs. {checkoutSummary?.tax?.toLocaleString() || 0}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>Rs. {checkoutSummary?.total?.toLocaleString() || 0}</span>
                </div>
            </CardContent>
        </Card>
    )
}