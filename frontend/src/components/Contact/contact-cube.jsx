"use client"


export default function ContactCube() {
    return (
        <div className="perspective-1000">
            <div
                className="cube-container w-[280px] h-[280px] md:w-[350px] md:h-[350px] relative preserve-3d"
            >
                {/* Front - Contact Info */}
                <div className="cube-face cube-face-front absolute inset-0 bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between border border-white/10">
                    <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center">
                            <span className="bg-purple-500/20 p-2 rounded-lg mr-3">
                                <svg
                                    className="w-5 h-5 text-purple-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </span>
                            Contact Info
                        </h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-gray-300 text-sm mb-1">Email us at</p>
                            <p className="text-lg font-medium">touseefabid737@gmail.com</p>
                        </div>

                        <div>
                            <p className="text-gray-300 text-sm mb-1">Call us at</p>
                            <p className="text-lg font-medium">+93 310 2939875</p>
                        </div>

                        <div>
                            <p className="text-gray-300 text-sm mb-1">Visit our office</p>
                            <p className="text-lg font-medium">Gulshan-e-zia Orangi Town, main bismillah chock, Street 08</p>
                        </div>
                    </div>

                </div>


               
            </div>
        </div>
    )
}

