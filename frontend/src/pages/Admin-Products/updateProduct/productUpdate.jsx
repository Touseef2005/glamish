"use client";

import ProductForm from "@/components/Forms/updateProductForm";
import { LoaderProgress } from "@/components/Loader/Loader";
import ProductNotFound from "@/components/NotFound/prouduct-notFound";
import { ApiService, localStorageHandler } from "@/utils";
import { useParams } from "next/navigation";
// import { useRouter } from "next/navigation";  // Change: Import useRouter instead of useParams
import { useCallback, useEffect, useState } from "react";

export default function ProductUpdate() {
    // const router = useRouter();
    const { id } = useParams() || {};
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [progress, setProgress] = useState(0);

    const fetchProduct = useCallback(async () => {
        if (!id) return;  // Prevent fetching if id is not available yet.

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
        fetchProduct();
    }, [id]);

    const updateProduct = async (data) => {
        try {
            const token = localStorageHandler.get("user")?.token;
            const res = await ApiService("patch", `product/update/${id}`, data, token);
            if (res.status === 1) {
                alert(res.message);
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div>
            {loading && (
                <div className="min-h-[90vh] flex justify-center items-center">
                    <LoaderProgress progress={progress} />
                </div>
            )}

            {product ? (
                <ProductForm product={product} onSubmit={updateProduct} />
            ) : (
                <div className="min-h-[90vh] flex justify-center items-center">
                    <ProductNotFound />
                </div>
            )}
        </div>
    );
}
