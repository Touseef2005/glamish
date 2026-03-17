'use client';

import Image from "next/image";
import { AspectRatio } from "@/components/shadcn-ui/aspect-ratio";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn-ui/card";
import { Separator } from "@/components/shadcn-ui/separator";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiService } from "@/utils/index";
import { ButtonPrimaryWithIcon } from "@/components/Buttons";
import ImageSlider from "@/components/ImageSlider";
import { FaRegStar, FaShoppingCart, FaStar } from "react-icons/fa";
import { PulseLoader } from "@/components/Loader/pulse-loader";
import { useApiCache } from "@/hooks";

export default function ProductDetails() {
    const params = useParams();
    const id = params?.id;

    const { data: product, loading, error } = useApiCache(
        `product/get/${id}`,
        () => ApiService('GET', `product/get/${id}`).then(res => res.data || [])
    );

    const [selectedImage, setSelectedImage] = useState("");

    // Initialize selected image when product loads
    useEffect(() => {
        if (product?.images?.length) {
            setSelectedImage(product.images[0]?.url);
        }
    }, [product]);

    // Memoized price calculations
    const priceDetails = useMemo(() => ({
        current: product?.price?.toFixed(2) || '0.00',
        original: product?.productPrice?.toFixed(2) || '0.00',
        discount: product?.discountPrice?.toFixed(2) || '0.00'
    }), [product]);

    if (loading) return (
        <div className="min-h-[30vh] flex justify-center items-center bg-white">
            <PulseLoader variant="default" />
        </div>
    );

    if (error || !product) return (
        <div className="text-center text-red-600 font-semibold">
            Product not found or an error occurred.
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-10">
            <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6 items-start">
                    {/* Image Section */}
                    <div className="space-y-4 m-2">
                        <AspectRatio ratio={4 / 3}>
                            <Image
                                src={selectedImage || "/placeholder.jpg"}
                                alt={product.name}
                                fill
                                className="rounded-md object-contain border"
                                priority
                            />
                        </AspectRatio>

                        <ImageSlider
                            images={product.images}
                            onSelect={(url) => setSelectedImage(url)} // यहाँ function को सही तरीके से pass करें
                            selectedImage={selectedImage}
                            thumbnailHeight="100"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="py-4 space-y-6">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-2 mb-4">
                                <RatingStars rating={product.averageRating} />
                                <span className="text-sm font-medium">
                                    ({product.totalReviews} reviews)
                                </span>
                            </div>

                            <CardTitle className="text-2xl md:text-3xl font-bold">
                                {product.name}
                            </CardTitle>
                            <CardDescription className="text-base md:text-lg">
                                {product.brand}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-0 space-y-6">
                            <PriceDisplay
                                current={priceDetails.current}
                                original={priceDetails.original}
                                discount={priceDetails.discount}
                            />

                            <Separator />

                            <ProductDescription description={product.description} />

                            <Separator />

                            <ProductMeta
                                category={product.category}
                                stock={product.stock}
                                unit={product.unit}
                                shippingCost={product.shippingCost}
                                shippingTime={product.shippingTime}
                                brand={product.brand}
                                rating={product.averageRating}
                            />
                        </CardContent>

                        <CardFooter className="p-0">
                            <AddToCartButton />
                        </CardFooter>
                    </div>
                </div>
            </Card>
        </div>
    );
}

// Sub-components for better organization
const RatingStars = ({ rating }) => (
    <div className="flex text-yellow-500">
        {[...Array(5)].map((_, i) =>
            i < Math.floor(rating) ? (
                <FaStar key={i} className="w-4 h-4" />
            ) : (
                <FaRegStar key={i} className="w-4 h-4" />
            )
        )}
    </div>
);

const PriceDisplay = ({ current, original, discount }) => (
    <div className="flex flex-col gap-2">
        <div className="text-xl md:text-2xl font-bold">PKR: {current}</div>
        {discount > 0 && (
            <div className="flex gap-4 items-center">
                <span className="text-sm text-muted-foreground line-through">
                    PKR: {original}
                </span>
                <span className="text-sm text-green-600 font-semibold">
                    Save PKR: {discount}
                </span>
            </div>
        )}
    </div>
);

const ProductDescription = ({ description }) => (
    <div className="space-y-2">
        <h3 className="font-semibold">Description</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
);

const ProductMeta = ({ category, stock, unit, shippingCost, shippingTime, brand, rating }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <MetaItem label="Category" value={category} />
        <MetaItem label="Stock" value={`${stock} ${unit}`} />
        <MetaItem label="Shipping" value={`PKR: ${Number(shippingCost).toFixed(2)}`} />
        <MetaItem label="Delivery Time" value={shippingTime} />
        <MetaItem label="Brand Name" value={brand} />
        <div className="flex items-center gap-2">
            <span className="font-semibold">Rating:</span>
            <span className="mr-2">{rating}</span>
            <RatingStars rating={rating} />
        </div>
    </div>
);

const MetaItem = ({ label, value }) => (
    <div>
        <span className="font-semibold">{label}: </span>
        <span className="text-muted-foreground">{value}</span>
    </div>
);

const AddToCartButton = () => (
    <ButtonPrimaryWithIcon
        title="Add To Cart"
        icon={<FaShoppingCart className="mr-2" />}
        className="w-full md:max-w-xs py-4 rounded-md text-sm font-semibold"
    />
);