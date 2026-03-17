"use client"

import Image from "next/image"
import { ArrowRight, ChevronDown } from "lucide-react"

export default function Hero2() {
    return (
        <main className=" py-12  w-full md:h-full sm:h-full h-[600px] mb-52"> 
        <div className="w-full max-w-full">
            <div className="relative w-full overflow-hidden bg-white text-black">
                <div className="flex flex-col md:flex-row">
                    {/* Content Section */}
                    <div className="z-10 flex flex-col items-center justify-center p-8 text-center md:w-1/2 md:items-start md:p-12 md:text-left">
                        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                            Unleash Your Beauty: Your Perfect Cosmetic Companion
                        </h1>
                        <p className="mb-4 max-w-md text-sm text-black sm:text-base">
                        Your skin barrier may need some extra love and care. Look no further than our first ever bundle nurturing your skin barrier that's dedicated to supporting and nurturing your skin barrier.
                        </p>
                        <button className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black-800 transition-all hover:bg-black hover:text-white">
                            Shop Now
                            <ArrowRight size={18} />
                        </button>
                    </div>
    
                    {/* Image Section */}
                    <div className="relative flex items-center justify-center md:w-1/2 rounded-lg mt-0 md:mt-0">
                        <div className="relative w-full h-auto sm:h-96 md:h-96 rounded-lg "> 
                            <Image
                                src="/hero3.jpg"
                                alt="Cosmetic Products"
                                layout="responsive"  // This ensures the image is responsive.
                                width={500}  // Set a default width for the image
                                height={600} // Set a default height for the image
                                className="object-contain p-4 rounded-xl"
                                priority
                            />
                        </div>
    
                        {/* Circular Badge */}
                        <div className="absolute bottom-2 right-12 z-20 flex h-16 w-16 flex-col items-center justify-center rounded-full border border-emerald-50/30 bg-gray-900/80 p-3 text-center text-[10px] text-white">
                            <span className="font-medium">EXPLORE</span>
                            <span className="font-medium">MORE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    
    
    )
}

