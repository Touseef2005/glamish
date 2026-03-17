import React from 'react'
import AddProductForm from '@/components/Forms/addProductForm'

export const metadata = {
    title: "Add Product",
};

export default function page() {
    return (
        <div>
            <AddProductForm />
        </div>
    )
}
