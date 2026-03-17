import Link from "next/link"


export default function Breadcrumb({ title, currentPage, backgroundImage }) {
    return (
        <div className="relative w-full py-8 md:py-12 overflow-hidden">
            <div
                className="absolute inset-0 w-full h-full bg-orange-50/80 z-0"
                style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-24 opacity-70">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20,50 Q40,20 50,50 T90,50" fill="#FFC8B4" />
                    </svg>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-24 opacity-70">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10,50 Q30,70 60,40 T90,50" fill="#FFD6CC" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4 text-gray-900">  {title}</h1>
                <div className="flex items-center justify-center space-x-2 text-sm md:text-base">
                    <Link href="/" className="text-gray-700 hover:text-orange-500 transition-colors">
                        Home
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-orange-400">{currentPage}</span>
                </div>
            </div>
        </div>
    )
}
