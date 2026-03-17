import { Suspense } from "react"
// import ProductDetail from "@components/ProductDetails/GlamishProductDetail"
import CosmeticLoader from "@/components/Loader/CosmeticLoader"
import { BASIC_URL } from "@/lib/config";
import dynamic from "next/dynamic";

const ProductDetail = dynamic(() => import("@components/ProductDetails/GlamishProductDetail"), { ssr: true })

export async function generateMetadata({ params }) {
  try {
    const response = await fetch(`${BASIC_URL}/api/product/get/${params.id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }

    const product = await response.json();
    const productData = product?.data || {};
    const imageUrl = productData?.images?.[0]?.url || '';

    return {
      title: `${productData?.name || 'Product'} | Glamish Beauty`,
      description: productData?.description || 'Discover this premium organic beauty product',
      alternates: {
        canonical: `https://glamishbeauty.vercel.app/products/${params.id}`,
      },
      openGraph: {
        title: `${productData?.name || 'Product'} | Glamish Beauty`,
        description: productData?.description || 'Premium organic beauty product',
        url: `https://glamishbeauty.vercel.app/product/${params.id}`,
        type: 'website',
        images: imageUrl
          ? [
            {
              url: imageUrl,
              width: 800,
              height: 600,
              alt: productData?.name || 'Product image',
            },
          ]
          : [],
        siteName: 'Glamish Beauty',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${productData?.name || 'Product'} | Glamish Beauty`,
        description: productData?.description || 'Premium organic beauty product',
        images: imageUrl ? [imageUrl] : [],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error(error); // Log the error to understand it better
    return {
      title: 'Product Details | Glamish Beauty',
      description: 'Discover this premium organic beauty product',
    };
  }
}

export default async function ProductPage({ params }) {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Structured data for rich snippets */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Product Name", // Will be dynamically replaced by client-side code
            "description": "Product Description", // Will be dynamically replaced
            "image": "https://example.com/product-image.jpg", // Will be dynamically replaced
            "brand": {
              "@type": "Brand",
              "name": "Glamish Beauty"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD", // Update as needed
              "price": "0.00", // Will be dynamically replaced
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      /> */}

      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <CosmeticLoader />
          <span className="sr-only">Loading product details...</span>
        </div>
      }>
        <ProductDetail id={params.id} />
      </Suspense>
    </main>
  )
}