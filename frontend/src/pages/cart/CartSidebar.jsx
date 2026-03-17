'use client'

import { Card, CardHeader, CardTitle } from "@/components/shadcn-ui/card"
import { Separator } from "@components/shadcn-ui/separator"
import { useMemo, useState } from "react"
import { useProductStore } from "@store/useProductStore.js"
import { calculateShippingCost, calculateTotal } from "@/lib/calculateTotal"
import { useIsMobile } from "@/hooks/use-mobile"
import { ArrowRight, ShoppingCart, Truck } from "lucide-react"
import { ButtonPrimaryWithIcon } from "@components/Buttons/index"
import { useRouter } from "next/navigation"
import ButtonOutlinedWithIcon from "@/components/Buttons/buttonOutlineWithIcon"

export default function CartSidebar() {

    const router = useRouter()

    const { cartItems, setCheckoutSummary } = useProductStore();
    const [couponCode, setCouponCode] = useState("")
    const [discount, setDiscount] = useState(0)

    const isMobile = useIsMobile()


    const subTotal = useMemo(() => Math.ceil(calculateTotal(cartItems)), [cartItems]);
    const tax = useMemo(() => Math.ceil((subTotal / 100) * 2.1), [subTotal]);
    const totalItems = useMemo(() => Math.ceil(cartItems.reduce((sum, item) => sum + item.quantity, 0)), [cartItems]);
    const shippingCost = useMemo(() => Math.ceil(calculateShippingCost(new Array(totalItems).fill(0))), [totalItems]);

    const total = useMemo(() => subTotal + shippingCost + tax - discount, [subTotal, shippingCost, tax, discount]);

    const productInfo = {
        products: cartItems.map(item => ({
            productId: item._id,
            quantity: item.quantity,
            price: item.price,
            name: item.name
        }))
    };

    const handleCheckout = () => {
        setCheckoutSummary({
            total,
            subTotal,
            tax,
            shippingCost,
            discount,
            productInfo: productInfo.products
        })
        router.push('/checkout');
    }

    return (
        <div className="lg:col-span-1 sticky top-24">
            <div
                className={"bg-background border rounded-lg"}
            >
                <Card className={`${isMobile ? "shadow-none border-0" : "border-0 shadow-sm"} p-6`}>
                    <CardHeader className="mb-0 flex items-center justify-between flex-row -mt-5">
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                            <Truck className="h-5 w-5" />
                            Order Summary
                        </CardTitle>
                    </CardHeader>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Total Items</span>
                            <div className="flex items-center">
                                <p className="text-sm text-muted-foreground bg-transparent text-peach-300 border border-peach-300 p-1 font-bold px-2 rounded-md">
                                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>Rs {subTotal?.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>{shippingCost === 0 ? "Free" : `Rs ${shippingCost?.toLocaleString()}`}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span>Rs {tax?.toLocaleString()}</span>
                        </div>

                        <Separator className="my-2" />

                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>Rs {total?.toLocaleString()}</span>
                        </div>
                    </div>

                    <ButtonPrimaryWithIcon
                        className="w-full mt-6 group"
                        size="lg"
                        title="Checkout"
                        icon={<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                        onButtonClick={handleCheckout}
                    />

                    <ButtonOutlinedWithIcon
                        className="!w-full mt-2"
                        size="lg"
                        title="Continue Shopping"
                        icon={<ShoppingCart className="transition-transform group-hover:translate-x-1" />}
                        href={"/categories"}
                    />

                </Card>
            </div>
        </div>
    )
}