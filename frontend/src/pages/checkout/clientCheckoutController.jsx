'use client'

import { useProductStore } from "@/store/useProductStore"
import { useState, useEffect } from "react"
import DeliveryDetails from "./DeliveryDetails"
import OrderSummary from "./OrderSummary"
import PaymentMethod from "./PaymentMethod"
import { useRouter } from "next/navigation"
import { ApiService } from "@/utils"

export default function ClientCheckoutController() {
    const router = useRouter()

    const { checkoutSummary, clearCheckoutSummary, clearCart, cartItems } = useProductStore()


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: ""
    })

    useEffect(() => {
        if (checkoutSummary == null) {
            router.push("/cart")
        }
    }, [checkoutSummary, router])

    const validateForm = () => {
        const newErrors = {}
        if (!formData.firstName) newErrors.firstName = "First name is required."
        if (!formData.lastName) newErrors.lastName = "Last name is required."
        if (!formData.email) newErrors.email = "Email is required."
        if (!formData.phone) newErrors.phone = "Phone number is required."
        if (!formData.address) newErrors.address = "Address is required."
        if (!formData.city) newErrors.city = "City is required."
        if (!formData.postalCode) newErrors.postalCode = "Postal code is required."

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleFormChange = (e) => {

        if (errors[e.target.name]) {
            setErrors(prev => ({
                ...prev,
                [e.target.name]: ""
            }))
        }

        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCompleteOrder = async (paymentMethod) => {
        if (!validateForm()) {
            return
        }

        const orderData = {
            ...formData,
            total: checkoutSummary.total || 0,
            paymentMethod: paymentMethod || "cod",
            productInfo: checkoutSummary.productInfo
        }

        try {

            const res = ApiService("POST", "place-order", orderData)
            console.log(res)
            if (res) {
                alert("Your Order Has Been Placed")
                clearCheckoutSummary()
                clearCart()
                router.push("/cart")
            }

        } catch (error) {
            alert(error.message || "Something went wrong")
        }


        // clearCart()
        // clearCheckoutSummary()

        // router.push("/cart")
    }

    if (checkoutSummary == null) {
        return null
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <DeliveryDetails
                        formData={formData}
                        onFormChange={handleFormChange}
                        errors={errors}  // Pass errors to DeliveryDetails component
                    />
                </div>

                <div>
                    <OrderSummary checkoutSummary={checkoutSummary} cartItems={cartItems} />
                    <PaymentMethod onCompleteOrder={handleCompleteOrder} />
                </div>
            </div>
        </div>
    )
}
