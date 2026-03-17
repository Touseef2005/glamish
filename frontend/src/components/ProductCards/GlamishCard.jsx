import { Card, CardContent, CardHeader } from "@components/shadcn-ui/card";
import { Badge } from "@/components/shadcn-ui/badge";
import Image from "next/image";
import { Check, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { useProductStore } from "@store/useProductStore.js";
import { toast } from "@/hooks/use-toast";
import { memo, useEffect, useRef } from "react";

function GlamishCardComponent({
    _id,
    name,
    description,
    price,
    productPrice,
    discountPrice,
    images,
    category,
    stock,
    isNew = false
}) {
    const discountedPricePercentage = discountPrice > 0 ? ((discountPrice / productPrice) * 100).toFixed(0) : null;

    const { addToCart, cartItems } = useProductStore()
    const isAddedIntoCart = cartItems.some((item) => item._id === _id)
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        let startX, scrollLeft;
        let isDown = false;

        const handleMouseDown = (e) => {
            isDown = true;
            startX = e.pageX - card.offsetLeft;
            scrollLeft = card.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
        };

        const handleMouseUp = () => {
            isDown = false;
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - card.offsetLeft;
            const walk = (x - startX) * 2; // Adjust scroll speed
            card.scrollLeft = scrollLeft - walk;
        };

        // Touch event handlers
        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            startX = touch.pageX - card.offsetLeft;
            scrollLeft = card.scrollLeft;
        };

        const handleTouchMove = (e) => {
            if (!e.touches) return;
            const touch = e.touches[0];
            const x = touch.pageX - card.offsetLeft;
            const walk = (x - startX) * 2;
            card.scrollLeft = scrollLeft - walk;
        };

        card.addEventListener('mousedown', handleMouseDown);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseup', handleMouseUp);
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('touchstart', handleTouchStart);
        card.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            card.removeEventListener('mousedown', handleMouseDown);
            card.removeEventListener('mouseleave', handleMouseLeave);
            card.removeEventListener('mouseup', handleMouseUp);
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('touchstart', handleTouchStart);
            card.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    const handleAddToCart = (e) => {
        e.preventDefault()

        const product = {
            _id,
            name,
            description,
            price,
            productPrice,
            discountPrice,
            images,
            category,
            stock,
            quantity: 1
        }

        let cart = addToCart(_id, product, product.quantity)
        toast({
            title: "Added to cart!",
            description: `${product.quantity} ${cart?.message} added to your cart`,
        })
    }

    return (
        <>
            <Script
                id={`product-schema-${_id}`}
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": name,
                        "image": images[0]?.url || '/placeholder.jpg',
                        "description": description,
                        "brand": {
                            "@type": "Brand",
                            "name": "Glamish Beauty"
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": `https://glamishbeauty.vercel.app/product/${_id}`,
                            "priceCurrency": "PKR",
                            "price": price,
                            "availability": "https://schema.org/InStock"
                        }
                    })
                }}
            />

            <div
                ref={cardRef}
                className="snap-start flex-shrink-0 w-full sm:w-auto"
                style={{
                    scrollSnapAlign: 'start',
                    touchAction: 'pan-y'
                }}
            >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg rounded-xl p-4 bg-white flex flex-col">
                    <Link href={`/product/${_id}`}>
                        <div className="relative aspect-square overflow-hidden rounded-lg">
                            <motion.div
                                initial={{ opacity: 1 }}
                                whileHover={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={images[1]?.url || '/placeholder.jpg'}
                                    alt={name}
                                    fill
                                    className="object-cover rounded-lg"
                                    loading="eager"
                                    priority
                                    blurDataURL="/placeholder.png"
                                    placeholder="blur"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={images[0]?.url || images[2]?.url || '/placeholder.png'}
                                    alt={name}
                                    fill
                                    className="object-cover rounded-lg"
                                    priority
                                    blurDataURL="/placeholder.png"
                                    placeholder="blur"
                                />
                            </motion.div>

                            <div className="absolute left-2 top-2 flex flex-col gap-1">
                                {isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                                {discountPrice > 0 && (
                                    <Badge variant="destructive" className={"bg-red-500 hover:bg-red-600"}>-{discountedPricePercentage}%</Badge>
                                )}
                            </div>

                        </div>

                        <CardHeader className="p-4 pb-0">
                            {category && <p className="text-xs text-muted-foreground uppercase p-1 border text-nowrap line-clamp-1  border-orange-300 max-w-[190px] text-center rounded-md text-orange-400">{category}</p>}
                            <h3 className="font-medium text-lg line-clamp-1">{name}</h3>
                        </CardHeader>

                        <CardContent className="p-4 pt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-xl">₨{price.toFixed(2)}</p>
                                {discountPrice > 0 && (
                                    <p className="text-sm text-muted-foreground line-through">
                                        ₨{productPrice.toFixed(2)}
                                    </p>
                                )}
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className={`${isAddedIntoCart ? "bg-white text-peach-500 hover:bg-gray-100 border" : "bg-peach-500 text-white hover:bg-peach-600"} p-2 rounded-full transition-all`}
                                onClick={(e) => handleAddToCart(e)}
                                disabled={isAddedIntoCart}
                                aria-label={`Add ${name} to cart`}
                            >
                                {
                                    isAddedIntoCart ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <ShoppingCart className="h-5 w-5" />
                                    )
                                }
                            </motion.button>
                        </CardContent>
                    </Link>
                </Card>
            </div>
        </>
    );
}

export const GlamishCard = memo(GlamishCardComponent)
