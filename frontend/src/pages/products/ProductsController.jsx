"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn-ui/select"
import { Card, CardContent } from "@/components/shadcn-ui/card"
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react"
import { GlamishCard } from "@/components/ProductCards/GlamishCard"
import { useApiCache } from "@/hooks"
import { ApiService } from "@/utils"
import CosmeticLoader from "@/components/Loader/CosmeticLoader"
import dynamic from "next/dynamic"


export default function ProductsController() {
    const [sortOrder, setSortOrder] = useState("default")
    const [productData, setProductData] = useState([])

    const { data, loading } = useApiCache(
        'products',
        () => ApiService('GET', 'product/get-published')
            .then(res => res.data?.products || [])
            .catch(err => {
                setError(err);
            })
    );

    useEffect(() => {
        if (data) {
            setProductData(data);
        }
    }, [data]);



    // Use useMemo to sort products only when sortOrder changes
    const products = useMemo(() => {
        const sortedProducts = [...(data || [])];

        if (sortOrder === "low-to-high") {
            return sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "high-to-low") {
            return sortedProducts.sort((a, b) => b.price - a.price);
        }

        return sortedProducts;
    }, [data, sortOrder]);

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold ">Glamish All Products</h1>
                    <p className="text-muted-foreground mt-1">Discover our collection of premium products</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Sort by price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="low-to-high">
                                <div className="flex items-center gap-2">
                                    <ArrowUpAZ className="h-4 w-4" />
                                    <span>Price: Low to High</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="high-to-low">
                                <div className="flex items-center gap-2">
                                    <ArrowDownAZ className="h-4 w-4" />
                                    <span>Price: High to Low</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>


            {loading &&
                <div className="flex items-center justify-center h-[50vh]">
                    <CosmeticLoader isLoading={loading} />
                </div>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <GlamishCard key={product.id} {...product} />
                ))}
            </div>
        </main>
    )
}

// function ProductCard({ product }) {
//     return (
//         <Link href={`#`} className="group">
//             <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
//                 <div className="relative aspect-square overflow-hidden bg-gray-100">
//                     <div className="w-full h-full">
//                         <Image
//                             src={product.image || "/placeholder.svg"}
//                             alt={product.name}
//                             width={300}
//                             height={300}
//                             className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
//                         />
//                     </div>
//                 </div>
//                 <CardContent className="p-4 flex flex-col flex-grow">
//                     <h2 className="font-semibold text-lg line-clamp-1">{product.name}</h2>
//                     <p className="text-muted-foreground text-sm mt-1 line-clamp-2 flex-grow">{product.description}</p>
//                     <div className="mt-4 flex items-center justify-between">
//                         <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
//                         <span className="text-sm text-muted-foreground">Free shipping</span>
//                     </div>
//                 </CardContent>
//             </Card>
//         </Link>
//     )
// }
