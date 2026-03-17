import dynamic from 'next/dynamic'
import React from 'react'

const AboutUs = dynamic(() => import("@/components/About/GlamishAbout"))

export const metadata = {
    title: "About Us",
    description: "Learn more about Glamish Beauty, our mission, values, and the team behind our beauty services. Discover how we can help you achieve your beauty goals with expertise and care."
}


function page() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950">
            <AboutUs />
        </main>
    )
}

export default page
