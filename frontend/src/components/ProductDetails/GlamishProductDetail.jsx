"use client"

import { useState, useCallback, useMemo, memo } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn-ui/tabs"
import { Button } from "@/components/shadcn-ui/button"
import { Card } from "@/components/shadcn-ui/card"
import { Badge } from "@/components/shadcn-ui/badge"
import { ShoppingCart, Heart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"
import CosmeticLoader from "@components/Loader/CosmeticLoader"
import { useApiCache } from "@/hooks"
import { ApiService } from "@/utils"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/shadcn-ui/breadcrumb"
import ImageCarousel from "@components/Carousel/ImageCarousel"
import { useProductStore } from "@store/useProductStore.js"
import dynamic from "next/dynamic"
import { ProductSections } from "./ProductSection"

const RelatedProducts = dynamic(() => import("@components/RelatedProduct"), { ssr: false })

const MobileView = memo(({ product, quantity, setQuantity, handleAddToCart, handleAddToWishlist, isAddedIntoCart }) => {
    const [activeImage, setActiveImage] = useState(0)
    const [direction, setDirection] = useState(0)

    const handleImageNavigation = useCallback((action) => {
        if (typeof action === "number") {
            setDirection(action > activeImage ? 1 : -1)
            setActiveImage(action)
            return
        }
        setDirection(action === "next" ? 1 : -1)
        setActiveImage(prev => {
            if (action === "next") return (prev + 1) % product.images.length
            return (prev - 1 + product.images.length) % product.images.length
        })
    }, [activeImage, product.images.length])

    const discountPercentage = useMemo(() =>
        Math.round((product.discountPrice / product.productPrice) * 100),
        [product.discountPrice, product.productPrice]
    )

    const renderStars = useCallback((rating) =>
        Array(5).fill(0).map((_, i) => (
            <Star
                key={i}
                className={cn("w-4 h-4", i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
            />
        )),
        []
    )

    return (
        <div className="flex flex-col">
            <ImageCarousel
                images={product.images}
                activeImage={activeImage}
                direction={direction}
                setActiveImage={handleImageNavigation}
            />

            <div className="mb-4 px-4">
                <h1 className="text-xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">{renderStars(product.averageRating)}</div>
                    <span className="text-sm text-gray-500">({product.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-bold text-primary">Rs {product.price}</span>
                    <span className="text-sm line-through text-gray-500">Rs {product.productPrice}</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {discountPercentage}% off
                    </Badge>
                </div>
            </div>

            <Tabs defaultValue="info" className="w-full px-4">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="info">Details</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-sm text-gray-500">BRAND</h3>
                            <p>{product.brand}</p>
                        </div>

                        <div>
                            <h3 className="font-medium text-sm text-gray-500">DESCRIPTION</h3>
                            <p className="text-gray-700">{product.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-medium text-sm text-gray-500">CATEGORY</h3>
                                <p>{product.category}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-sm text-gray-500">STOCK</h3>
                                <p>
                                    {product.stock} {product.unit} available
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <Truck className="text-primary h-5 w-5" />
                            <div>
                                <p className="text-sm font-medium">Shipping: Rs {product.shippingCost}</p>
                                <p className="text-xs text-gray-500">Estimated delivery: {product.shippingTime}</p>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="reviews">
                    <Card className="p-4">
                        <h3 className="font-semibold text-lg mb-2">Customer Reviews</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex">{renderStars(product.averageRating)}</div>
                            <span className="text-sm">
                                {product.averageRating} out of 5 ({product.totalReviews}{" "}
                                {product.totalReviews === 1 ? "review" : "reviews"})
                            </span>
                        </div>

                        {product.totalReviews > 0 ? (
                            <div className="space-y-4">
                                <div className="border-t pt-4">
                                    <div className="flex justify-between">
                                        <h4 className="font-medium">Customer</h4>
                                        <div className="flex">{renderStars(5)}</div>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Great product! I love how it makes my skin feel refreshed and glowing.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">No reviews yet.</p>
                        )}
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-10">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-md"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                        >
                            -
                        </Button>
                        <div className="h-8 w-10 flex items-center justify-center border-y">{quantity}</div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-md"
                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                            disabled={quantity >= product.stock}
                        >
                            +
                        </Button>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Total:</p>
                        <p className="font-bold">Rs {product.price * quantity}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={handleAddToWishlist}>
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                    </Button>
                    {
                        isAddedIntoCart ?
                            <Button size="lg" disabled>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Already in Cart
                            </Button>
                            :
                            <Button size="lg" onClick={handleAddToCart}>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Add to Cart
                            </Button>
                    }
                </div>
            </div>
            <div className="h-12"></div>
        </div>
    )
})

const DesktopView = memo(({ product, quantity, setQuantity, handleAddToCart, handleAddToWishlist, isAddedIntoCart }) => {
    const [activeImage, setActiveImage] = useState(0)

    const handleImageNavigation = useCallback((index) => {
        setActiveImage(index)
    }, [])

    const discountPercentage = useMemo(() =>
        Math.round((product.discountPrice / product.productPrice) * 100),
        [product.discountPrice, product.productPrice]
    )

    const renderStars = useCallback((rating) =>
        Array(5).fill(0).map((_, i) => (
            <Star
                key={i}
                className={cn("w-4 h-4", i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
            />
        )),
        []
    )

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-fit">
                <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                    <div className="mb-4">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink>Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink>Product</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{product.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="relative rounded-xl overflow-hidden bg-gray-50 aspect-video">
                        <Image
                            src={product.images[activeImage].url}
                            alt={product.name}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        {product.images.map((image, index) => (
                            <button
                                key={image._id}
                                className={cn(
                                    "relative aspect-square rounded-md overflow-hidden border-2",
                                    activeImage === index ? "border-primary" : "border-transparent"
                                )}
                                onClick={() => handleImageNavigation(index)}
                            >
                                <Image
                                    src={image.url}
                                    alt={`${product.name} - view ${index + 1}`}
                                    fill
                                    className="object-contain"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                {product.category}
                            </Badge>
                            {product.stock < 10 && (
                                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                    Low Stock
                                </Badge>
                            )}
                        </div>

                        <h1 className="text-3xl font-bold">{product.name}</h1>

                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center">{renderStars(product.averageRating)}</div>
                            <span className="text-sm text-gray-500">({product.totalReviews} reviews)</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">Brand: {product.brand}</span>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl">
                        <div className="flex items-end gap-3">
                            <span className="text-3xl font-bold text-primary">Rs {product.price}</span>
                            <div className="flex flex-col">
                                <span className="text-sm line-through text-gray-500">Rs {product.productPrice}</span>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mt-1">
                                    Save Rs {product.discountPrice} ({discountPercentage}% off)
                                </Badge>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex items-center">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-l-md"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </Button>
                                <div className="h-10 w-12 flex items-center justify-center border-y">{quantity}</div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-r-md"
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={quantity >= product.stock}
                                >
                                    +
                                </Button>
                            </div>
                            <span className="text-sm text-gray-500">
                                {product.stock} {product.unit} available
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <Button variant="outline" size="lg" onClick={handleAddToWishlist}>
                                <Heart className="mr-2 h-5 w-5" />
                                Add to Wishlist
                            </Button>
                            {
                                isAddedIntoCart ?
                                    <Button size="lg" disabled>
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Already in Cart
                                    </Button>
                                    :
                                    <Button size="lg" onClick={handleAddToCart}>
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Add to Cart
                                    </Button>
                            }
                        </div>
                    </div>

                    <div className={`grid ${product.warranty ? "grid-cols-3" : "grid-cols-2"} gap-4 pt-6 border-t border-gray-200`}>
                        <div className="text-center">
                            <Truck className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                            <p className="text-sm font-medium">Fast Delivery</p>
                            <p className="text-xs text-gray-600">{product.shippingTime}</p>
                        </div>
                        {
                            product.warranty && (
                                <div className="text-center">
                                    <Shield className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                                    <p className="text-sm font-medium">Warranty</p>
                                    <p className="text-xs text-gray-600">{product.warranty}</p>
                                </div>
                            )
                        }
                        <div className="text-center">
                            <RotateCcw className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                            <p className="text-sm font-medium">Easy Returns</p>
                            <p className="text-xs text-gray-600">30 days</p>
                        </div>
                    </div>

                    {/* <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <Truck className="text-primary h-8 w-8" />
                        <div>
                            <p className="font-medium">Shipping: Rs {product.shippingCost}</p>
                            <p className="text-sm text-gray-500">Estimated delivery: {product.shippingTime}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Product Description</h2>
                        <div className="prose max-w-none">
                            <p>{product.description}</p>

                            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                    <h3 className="font-medium text-sm text-gray-500">CATEGORY</h3>
                                    <p>{product.category}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm text-gray-500">BRAND</h3>
                                    <p>{product.brand}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm text-gray-500">UNIT</h3>
                                    <p>{product.unit}</p>
                                </div>
                                {product.sku && (
                                    <div>
                                        <h3 className="font-medium text-sm text-gray-500">SKU</h3>
                                        <p>{product.sku}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div> */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                            <p className="text-gray-600 leading-relaxed text-lg mt-4">
                                This premium cosmetic product is carefully formulated with high-quality ingredients to deliver exceptional
                                results. Suitable for all skin types and designed to enhance your natural beauty with long-lasting effects.
                            </p>
                        </div>
                    </section>

                </div>
            </div>

            <div className="mt-6 p-6 rounded-xl">
                <ProductSections product={product} />
                {/* <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Customer Reviews</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(product.averageRating)}</div>
                        <span className="text-sm">
                            ({product.totalReviews} {product.totalReviews === 1 ? "review" : "reviews"})
                        </span>
                    </div>
                </div> */}

                {/* {product.totalReviews > 0 ? (
                    <div className="space-y-6">
                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between">
                                <h4 className="font-medium">Zain</h4>
                                <div className="flex">{renderStars(5)}</div>
                            </div>
                            <p className="mt-2 text-gray-600">
                                Great product! I love how it makes my skin feel refreshed and glowing.
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )} */}

                {/* <Button variant="outline" className="w-full mt-4">
                    Write a Review
                </Button> */}
            </div>
        </>
    )
})

export default function ProductDetail({ id }) {
    const { data: product, loading } = useApiCache(
        `product/get/${id}`,
        () => ApiService('GET', `product/get/${id}`).then(res => res.data || [])
    )

    const { addToCart, cartItems } = useProductStore()
    const isAddedIntoCart = cartItems.some((item) => item._id === id)

    const [quantity, setQuantity] = useState(1)
    const { toast } = useToast()
    const isMobile = useIsMobile()

    const handleAddToCart = useCallback(() => {
        let cart = addToCart(id, product, quantity)
        toast({
            title: "Added to cart!",
            description: `${quantity} ${""} added to your cart`,
            variant: "success",
            duration: 1500
        })
    }, [product?.name, quantity, toast])

    const handleAddToWishlist = useCallback(() => {
        toast({
            title: "Added to wishlist",
            description: `${product?.name} added to your wishlist`,
            variant: "success"
        })
    }, [product?.name, toast])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <CosmeticLoader />
            </div>
        )
    }

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <>
            {isMobile ? (
                <MobileView
                    product={product}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleAddToCart={handleAddToCart}
                    handleAddToWishlist={handleAddToWishlist}
                    isAddedIntoCart={isAddedIntoCart}
                />
            ) : (
                <DesktopView
                    product={product}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleAddToCart={handleAddToCart}
                    handleAddToWishlist={handleAddToWishlist}
                    isAddedIntoCart={isAddedIntoCart}
                />
            )}
            {
                product && (
                    <div>
                        <RelatedProducts currentCategory={product.category} />
                    </div>
                )
            }
        </>
    )
}