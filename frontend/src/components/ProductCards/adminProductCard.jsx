import Image from "next/image"
import { Star } from "lucide-react"
import { ButtonPrimary } from "@/components/Buttons/index";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn-ui/card"
import { Badge } from "@/components/shadcn-ui/badge"
import { Button } from "@/components/shadcn-ui/button"


export default function Product({ product }) {
    const discountPercentage = Math.round((product.discountPrice / product.productPrice) * 100)

    return (
        <Card className="w-full max-w-[400px] md:max-w-[450px]">
            <CardHeader>
                <div className="relative w-full h-56 mb-4">
                    <Image src={product.images[0].url} alt={product.name} layout="fill" objectFit="cover" className="rounded-t-lg " />
                    {product.isFeatured && (
                        <Badge className="absolute top-2 left-2" variant="secondary">
                            Featured
                        </Badge>
                    )}
                    {discountPercentage > 0 && (
                        <Badge className="absolute top-2 right-2" variant="destructive">
                            {discountPercentage}% OFF
                        </Badge>
                    )}
                </div>
                <CardTitle>{product.name}</CardTitle>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <span>{product.brand}</span>
                    <span>•</span>
                    <span>{product.category}</span>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    {product.description.length > 50
                        ? `${product.description.slice(0, 100)}...`
                        : product.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">PKR: {product.price?.toLocaleString()}</span>
                        {discountPercentage > 0 && (
                            <span className="text-sm text-muted-foreground line-through">
                                PKR: {product.productPrice?.toLocaleString()}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center">
                        <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                        <span className="text-sm font-medium">
                            {product.averageRating?.toFixed(1)} ({product.totalReviews} reviews)
                        </span>
                    </div>
                </div>
                {/* <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>SKU: {product.sku}</div>
                    <div>
                        Stock: {product.stock} {product.unit}
                    </div>
                    <div>Shipping: ${product.shippingCost}</div>
                    <div>Delivery: {product.shippingTime}</div>
                </div> */}
            </CardContent>
            <CardFooter>
                <ButtonPrimary
                    title="View Product"
                    href={`/admin/Dashboard/product/${product._id}`}
                    className={`w-full`}
                />
            </CardFooter>
        </Card>
    )
}

