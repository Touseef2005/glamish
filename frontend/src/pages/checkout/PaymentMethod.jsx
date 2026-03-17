"use client"

import { useState } from "react"
import { Check, CreditCard, Smartphone, Truck } from "lucide-react"
import { Button } from "@/components/shadcn-ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn-ui/card"
import { Input } from "@/components/shadcn-ui/input"
import { Label } from "@/components/shadcn-ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/shadcn-ui/radio-group"


export default function PaymentMethod({ onCompleteOrder }) {
    const [paymentMethod, setPaymentMethod] = useState("cod")

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                            <Truck className="h-5 w-5" />
                            <div>
                                <p className="font-medium">Cash on Delivery</p>
                                <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                            </div>
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted">
                        <RadioGroupItem value="easypaisa" id="easypaisa" />
                        <Label htmlFor="easypaisa" className="flex items-center gap-2 cursor-pointer flex-1">
                            <Smartphone className="h-5 w-5" />
                            <div>
                                <p className="font-medium">Easypaisa</p>
                                <p className="text-sm text-muted-foreground">Pay via Easypaisa mobile wallet</p>
                            </div>
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                            <CreditCard className="h-5 w-5" />
                            <div>
                                <p className="font-medium">Credit/Debit Card</p>
                                <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                            </div>
                        </Label>
                    </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                    <div className="mt-4 space-y-4 border-t pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input id="expiryDate" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nameOnCard">Name on Card</Label>
                            <Input id="nameOnCard" placeholder="Enter name as on card" />
                        </div>
                    </div>
                )}

                {paymentMethod === "easypaisa" && (
                    <div className="mt-4 space-y-4 border-t pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="easypaisaNumber">Easypaisa Number</Label>
                            <Input id="easypaisaNumber" placeholder="03XX XXXXXXX" />
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={() => onCompleteOrder(paymentMethod)}>
                    <Check className="mr-2 h-4 w-4" /> Complete Order
                </Button>
            </CardFooter>
        </Card>
    )
}