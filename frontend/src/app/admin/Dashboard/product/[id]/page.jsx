import React from 'react';
import ProductDetails from '@/pages/Admin-Products/ProductDetails/productDetails';

export const metadata = {
    title: "Product Details",
};


export default function page() {

    return (
        <div className='min-h-screen'>
           <ProductDetails />
        </div>
    )
}
