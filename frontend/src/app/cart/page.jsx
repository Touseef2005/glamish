import Breadcrumb from '@/components/breadcrumb'
import { ShoppingBag } from 'lucide-react'
import dynamic from 'next/dynamic'
import React from 'react'

const AddToCart = dynamic(() => import("@/pages/cart/cart"), {
    ssr: true
})

export const metadata = {
    title: "Cart",
    description: "Learn more about Glamish Beauty, our mission, values, and the team behind our beauty services. Discover how we can help you achieve your beauty goals with expertise and care."
}


function page() {
    return (
        <main className="  dark:bg-slate-950">
            <Breadcrumb
                title="Your CART"
                currentPage="Your cart"
            />
            <AddToCart />
        </main>
    )
}

export default page
