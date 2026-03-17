"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn-ui/card"
import TextInput from "@/components/Inputs/TextInput";
import { ButtonPrimary } from "@/components/Buttons/index";
import CheckboxInput from "@components/Inputs/CheckboxInput";
import { useState, useEffect, useMemo, useCallback } from "react";

export default function ProductForm({ product, onSubmit }) {

    const initialFormData = useMemo(() => ({
        name: "",
        description: "",
        category: "",
        brand: "",
        discountPrice: "",
        productPrice: "",
        stock: "",
        unit: "",
        sku: "",
        shippingCost: "",
        shippingTime: "",
        featuredProduct: product ? product.isFeatured : false,
        published: product ? product.isPublished : false,
        tags: [],
        ...product,
    }), [product]);

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    const fieldMapping = {
        isPublished: "published",
        isFeatured: "featuredProduct",
    };

    const handleChange = useCallback((field, value) => {
        const mappedField = fieldMapping[field] || field;
        setFormData((prev) => {
            if (prev[mappedField] === value) return prev;
            return {
                ...prev,
                [mappedField]: value,
            };
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };



    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextInput label="Product Name" name="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
                        <TextInput label="Category" name="category" value={formData.category} onChange={(e) => handleChange("category", e.target.value)} />
                        <TextInput label="Brand" name="brand" value={formData.brand} onChange={(e) => handleChange("brand", e.target.value)} />
                        <TextInput label="Product Price" name="productPrice" type="number" value={formData.productPrice} onChange={(e) => handleChange("productPrice", e.target.value)} />
                        <TextInput label="Discount Price" name="discountPrice" type="number" value={formData.discountPrice} onChange={(e) => handleChange("discountPrice", e.target.value)} />
                        <TextInput label="Stock" name="stock" type="number" value={formData.stock} onChange={(e) => handleChange("stock", e.target.value)} />
                        <TextInput label="SKU" name="sku" type="text" value={formData.sku} onChange={(e) => handleChange("sku", e.target.value)} />
                        <TextInput label="Unit" name="unit" type="text" value={formData.unit} onChange={(e) => handleChange("unit", e.target.value)} />
                        <TextInput label="Shipping Cost" name="shippingCost" type="number" value={formData.shippingCost} onChange={(e) => handleChange("shippingCost", e.target.value)} />
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                                name="description"
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Shipping Time"
                            />
                        </div>
                    </div>

                    <CheckboxInput label="Published" name="published" checked={formData.published} onChange={(e) => handleChange("published", !formData.published)} />
                    <CheckboxInput label="Featured" name="featuredProduct" checked={formData.featuredProduct} onChange={(e) => handleChange("featuredProduct", !formData.featuredProduct)} />
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <ButtonPrimary title="Update Product" type="submit" className="w-full" />
                </CardFooter>
            </form>
        </Card>
    );
}



