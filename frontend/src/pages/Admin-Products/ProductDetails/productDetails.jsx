'use client';

import Image from "next/image"
import { AspectRatio } from "@/components/shadcn-ui/aspect-ratio"
import { Button } from "@/components/shadcn-ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn-ui/card"
import { Separator } from "@/components/shadcn-ui/separator"
import { CircleFadingArrowUp, ShoppingCart, Star } from "lucide-react"
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ApiService } from "@/utils/index";
import { ButtonPrimaryWithIcon } from "@/components/Buttons";
import { LoaderProgress } from "@components/Loader/Loader";
import ImageSlider from "@/components/ImageSlider";

export default function ProductDetails() {

    const { id } = useParams() || {};
    const [product, setProduct] = useState({});
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState();

    const fetchProduct = useCallback(async () => {
        try {
            setProgress(20);

            setProgress(50);

            const res = await ApiService("GET", `product/get/${id}`);

            setProgress(80);

            setProduct(res.data);
            setProgress(100);
        } catch (error) {
            console.error("Error fetching product:", error);
            setProduct({});
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className="container mx-auto px-4 py-10">

            {loading && (
                <div className="min-h-[90vh] flex justify-center items-center">
                    <LoaderProgress progress={progress} />
                </div>
            )}

            {!loading &&
                <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2  gap-6 items-center ">
                        <div className="space-y-4 m-2">
                            {/* Main Image */}
                            <AspectRatio ratio={4 / 3}>
                                <Image
                                    src={selectedImage || product.images?.[0]?.url}
                                    alt={product.name}
                                    fill
                                    className="rounded-md object-scale-down border"
                                />
                            </AspectRatio>

                            {/* Thumbnail Images - Modified Section */}
                            <div>
                                <ImageSlider
                                    images={product.images}
                                    setSelectedImage={setSelectedImage}
                                    width="100%"
                                    height="100px"
                                />
                            </div>
                        </div>
                        <div className="py-4">
                            <div className="flex items-center ">
                                <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                                <span className="text-sm font-medium">
                                    {product.averageRating?.toFixed(1)} ({product.totalReviews} reviews)
                                </span>
                            </div>

                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
                                <CardDescription className="text-lg">{product.brand}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="text-2xl font-bold">PKR: {product.price?.toFixed(2)}</div>
                                    {
                                        product.discountPrice &&
                                        <>
                                            <div className="text-sm text-muted-foreground line-through">PKR: {product.productPrice?.toFixed(2)}</div>
                                            <div className="text-sm text-green-600 font-semibold">Save PKR: {product.discountPrice?.toFixed(2)}</div>
                                        </>
                                    }
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <h3 className="font-semibold">Description</h3>
                                    <p className="text-sm text-muted-foreground">{product.description}</p>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-semibold">Category : </span> {product.category}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Stock : </span> {product.stock} {product.unit}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Shipping : </span> PKR: {product.shippingCost?.toFixed(2)}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Delivery Time : </span> {product.shippingTime}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Warranty : </span> {product.warranty}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Published : </span> {product.isPublished ? "Yes" : "No"}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Featured Product : </span> {product.isFeatured ? "Yes" : "No"}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <ButtonPrimaryWithIcon
                                    title="Update Product"
                                    icon={<CircleFadingArrowUp />}
                                    className={`w-full`}
                                    href={`/admin/Dashboard/product/updateProduct/${product._id}`}
                                />
                                {/* <Button className="w-full">
                                <CircleFadingArrowUp /> Update Product
                            </Button> */}
                            </CardFooter>
                        </div>
                    </div>
                </Card>}
        </div>
    )
}

