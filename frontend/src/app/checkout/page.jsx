// import ClientCheckoutController from '@/pages/checkout/clientCheckoutController'
import dynamic from "next/dynamic";

const ClientCheckoutController = dynamic(() => import("@/pages/checkout/clientCheckoutController"), {
    ssr: true
})

export const metadata = {
    title: "Checkout",
    dessctiption: "Learn more about Glamish Beauty, our mission, values, and the team behind our beauty services. Discover how we can help you achieve your beauty goals with expertise and care."
}

export default function page() {
    return (
        <div>
            <ClientCheckoutController />
        </div>
    )
}


