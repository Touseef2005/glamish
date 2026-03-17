"use client"

import { useApiCache } from "@/hooks";
import { ApiService } from "@/utils";
import CosmeticLoader from "@/components/Loader/CosmeticLoader";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/shadcn-ui/dropdown-menu";
import { Button } from "@/components/shadcn-ui/button";

const ProductGrid = dynamic(() => import("@components/Grid/ProductGrid"), { ssr: false })


export default function CosmeticCategoryPage() {

    const searchParams = useSearchParams();
    const queryParam = searchParams.get('category');

    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(queryParam || "");


    const cacheKey = useMemo(() => ['products', selectedCategory], [selectedCategory])


    const { data: products, loading } = useApiCache(
        cacheKey,
        () => {
            const endpoint = selectedCategory
                ? `product/get-published?category=${selectedCategory}`
                : 'product/get-published';

            return ApiService('GET', endpoint)
                .then(res => res.data?.products || [])
                .catch(err => setError(err));
        }
    );


    useEffect(() => {
        if (queryParam && queryParam !== selectedCategory) {
            setSelectedCategory(queryParam);
        }
    }, [queryParam]);

    const handleSortChange = (option) => {
        setSelectedCategory(option);
    };

    return (
        <div className="min-h-screen bg-pink-50/30">

            <div className="container mx-auto px-4 py-8">

                <h2>Cosmetic Category</h2>
                <div className="flex justify-between items-center p-2 rounded-md mb-6 sticky top-16 bg-transparent z-10 backdrop-blur-md ">
                    <p className="text-sm text-muted-foreground">Showing {products && products?.length || 0} products</p>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex items-center">
                                    Apply Category:{" "}
                                    {selectedCategory === "face wash"
                                        ? "Face Wash"
                                        : selectedCategory === "cosmetic"
                                            ? "Cosmetic"
                                            : selectedCategory === "cream"
                                                ? "Cream"
                                                : "All"
                                    }
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleSortChange("face wash")}>Face Wash</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSortChange("cosmetic")}>Cosmetic</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSortChange("cream")}>Cream</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSortChange("")}>All</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>


                {loading ?
                    <div className="flex justify-center items-center min-h-screen">
                        <CosmeticLoader isLoading={loading} className="w-16 h-16" />
                    </div>
                    : (
                        <div className="flex flex-col md:flex-row gap-8">
                            <ProductGrid
                                products={products}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}