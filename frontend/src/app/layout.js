import { Geist, Geist_Mono, Pacifico, Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import SmallNavbar from "@/components/SmallNav/smallNav";
import Script from "next/script";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/shadcn-ui/toaster";

const CosmeticFooter = dynamic(() => import("@/components/Footer/CosmeticFooter"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap"
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
  display: "swap"
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap"
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


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* <link rel="icon" href="/2.avif" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://glamish-beauty.vercel.app" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Glamish Beauty – Premium Organic Cosmetics Pakistan" />
        <meta property="og:description" content="Buy organic makeup, skincare, and haircare products in Pakistan." />
        <meta property="og:image" content="https://glamish-beauty.vercel.app/category4.webp" />
        <meta property="og:url" content="https://glamish-beauty.vercel.app" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Glamish Beauty – Premium Organic Cosmetics Pakistan" />
        <meta name="twitter:description" content="Buy organic makeup, skincare, and haircare products in Pakistan." />
        <meta name="twitter:image" content="https://glamish-beauty.vercel.app/category4.webp" /> */}
     
        <meta name="google-site-verification" content="ZYHf1udmb21EV2bGAP1Q951r233nWsDnSj2iEB8gO-g" />
      </Head>

      <head>
        <link rel="preload" href="/Hero-Section/Hero-3.avif" as="image" />
      </head>


      <body className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${poppins.variable} ${quicksand.variable} antialiased  bg-orange-50 `}>
        <SmallNavbar />
        <Navbar />
        {children}
        <Toaster />
        <CosmeticFooter />

        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GFF8NRQ6PE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GFF8NRQ6PE');
          `}
        </Script>
      </body>
    </html>
  );
}
