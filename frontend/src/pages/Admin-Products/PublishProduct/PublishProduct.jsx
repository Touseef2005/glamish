"use client";
import Product from "@/components/ProductCards/adminProductCard";
import { ApiService, localStorageHandler } from "@/utils/index";
import { useEffect, useState, useCallback } from "react";
import { LoaderProgress } from "@/components/Loader/Loader";
import ProductNotFound from "@/components/NotFound/prouduct-notFound";
import AxiosError from "@/components/Error/axiosError";

export default function PublishProduct() {
    const [products, setProducts] = useState({});
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        try {
            setProgress(20);
            const res = await ApiService("GET", "product/get-published");

            setProgress(80);

            // console.log("Products:", res.data.products);
            setProducts(res.data.products);
            setProgress(100);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (error) {
        return (
            <div className="min-h-screen container mx-auto flex justify-center items-center">
                <AxiosError error={error} />
            </div>
        )
    }

    return (
        <div className="min-h-screen container mx-auto">

            <h2 className="text-4xl font-bold mb-4 text-center mt-12">Published Products</h2>

            {/* Loader Progress */}
            {loading && (
                <div className="min-h-[90vh] flex justify-center items-center">
                    <LoaderProgress progress={progress} />
                </div>
            )}

            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full my-10">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="">
                            <ProductNotFound />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
