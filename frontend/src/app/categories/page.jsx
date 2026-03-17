import dynamic from "next/dynamic"

const CosmeticCategoryPage = dynamic(() => import("@/pages/category/DynamicCategoryController"), {
    loading: () => <p className="text-center mt-20" >Loading...</p>,
})


export const metadata = {
    title: "Choose Your Category",
    description: "Explore top cosmetic categories at Glamish Beauty. Find the perfect products that match your style and needs.",
    keywords: ["Glamish Beauty", "Cosmetic Categories", "Skincare", "Makeup", "Beauty Products"],
    authors: [{ name: "Glamish Team", url: "https://glamish-beauty.vercel.app" }],
    openGraph: {
        title: "Glamish Beauty || Choose Your Category",
        description: "Discover your favorite cosmetic products by category at Glamish Beauty.",
        url: "https://glamish-beauty.vercel.app/categories",
        siteName: "Glamish Beauty",
        images: [
            {
                url: "https://glamish-beauty.vercel.app/category/skincare.webp",
                width: 1200,
                height: 630,
                alt: "Glamish Beauty Categories",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Glamish Beauty || Choose Your Category",
        description: "Explore top cosmetic categories and shop the best beauty products.",
        images: ["https://glamish-beauty.vercel.app/category4.webp"],
    },
};


export default function Page() {
    return (
        <>
            <CosmeticCategoryPage />
            {/* <h2 className="text-2xl font-bold mt-10">Categories</h2> */}
        </>
    )
}