import Image from "next/image";
import { motion } from "framer-motion";

export default function BeautyBanner() {
    return (
        <section className=" font-quicksand mx-auto  min-h-screen flex flex-col justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow">
                <div className="lg:col-span-2">
                    <HoverImage
                        src="/Hero-Section/Hero-6.webp"
                        title="Beautiful Scene"
                        description="A stunning view of nature."
                        className="h-full"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <HoverImage
                        src="/Hero-Section/Hero-7.webp"
                        title="City Lights"
                        description="The city shining at night."
                        className="flex-1"
                    />
                    <HoverImage
                        src="/Hero-Section/Hero-3.webp"
                        title="Mountain View"
                        description="A peaceful mountain landscape."
                        className="flex-1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <HoverImage
                    src="/Hero-Section/Hero-8.webp"
                    title="Sunset"
                    description="A beautiful sunset."
                />
                <HoverImage
                    src="/Hero-Section/Hero-5.webp"
                    title="Ocean Waves"
                    description="Calm ocean waves at dawn."
                />
                <HoverImage
                    src="/Hero-Section/Hero-4.webp"
                    title="Forest Trail"
                    description="A misty morning in the woods."
                />
            </div>
        </section>
    );
}
function HoverImage({ src, title, description, className }) {
    return (
        <motion.div
            className={`relative overflow-hidden rounded-lg ${className}`}
        // whileHover={{ scale: 1.05 }}
        >
            <Image
                src={src}
                width={400}
                height={300}
                alt={title}
                className="w-full h-full object-cover aspect-[16/9]  rounded-lg"
                loading="lazy"
                decoding="async"
            />
            <motion.div
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
            >
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm">{description}</p>
            </motion.div>
        </motion.div>
    );
}
