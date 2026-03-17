import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";

const GlamishHome = dynamic(() => import("@/pages/home/page"),{
  ssr: true
})

export const metadata = {
  title: {
    default: "Glamish Beauty – Premium Organic Cosmetics Pakistan",
    template: "%s | Glamish Beauty"
  },
  description: "Organic makeup, skincare aur haircare products khareedein Glamish Beauty se",
  keywords: ["Organic Cosmetics", "Pakistan Beauty Products", "Natural Makeup"], // Keywords add karein
  robots: "index, follow",
  verification: {
    google: "ZYHf1udmb21EV2bGAP1Q951r233nWsDnSj2iEB8gO-g",
  },
  openGraph: {
    title: "Glamish Beauty – Premium Organic Cosmetics Pakistan",
    description: "Buy organic makeup, skincare, and haircare products at Glamish Beauty.",
    url: "https://glamish-beauty.vercel.app",
    siteName: "Glamish Beauty",
    locale: 'en_US',
    tags: ['beauty', 'organic'],
    images: [
      {
        url: "https://glamish-beauty.vercel.app/category/makeup.webp",
        width: 1200,
        height: 630,
        alt: "Glamish Beauty Organic Beauty Products",
      },
    ],
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Glamish Beauty – Premium Organic Cosmetics Pakistan",
    description: "Organic makeup, skincare aur haircare products",
    images: ['https://glamish-beauty.vercel.app/category/makeup.webp'],
  },
};

export default function Page() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Buy Organic Beauty Products in Pakistan | Glamish Beauty</title>
        <meta name="description" content="Shop the best organic makeup, skincare, and haircare products in Pakistan. 100% natural, cruelty-free, and chemical-free beauty products." />
        <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />

      </Head>


      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Glamish Beauty",
            "url": "https://glamish-beauty.vercel.app",
            "logo": "https://glamish-beauty.vercel.app/category4.webp",
            "sameAs": [
              "https://facebook.com/yourpage",
              "https://instagram.com/yourprofile"
            ]
          }),
        }}
      />


      <GlamishHome />
    </div>
  );
}