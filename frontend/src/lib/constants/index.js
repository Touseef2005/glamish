import { Sparkles, Palette, Scissors, Droplets, ShowerHeadIcon as Shower, Brush, Waves } from "lucide-react"



export const products = [
    {
        id: 1,
        name: "Hydrating Face Cream",
        brand: "Glow Essentials",
        price: 24.99,
        rating: 4.5,
        images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
        category: "Skincare",
        tags: ["Moisturizer", "Hydrating", "Face"],
    },
    {
        id: 2,
        name: "Volumizing Mascara",
        brand: "Lash Beauty",
        price: 18.99,
        rating: 4.2,
        images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
        category: "Makeup",
        tags: ["Eyes", "Mascara", "Volumizing"],
    },
    {
        id: 3,
        name: "Matte Lipstick",
        brand: "Color Pop",
        price: 15.99,
        rating: 4.7,
        images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
        category: "Makeup",
        tags: ["Lips", "Matte", "Lipstick"],
    },
    {
        id: 4,
        name: "Vitamin C Serum",
        brand: "Glow Essentials",
        price: 29.99,
        rating: 4.8,
        images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
        category: "Skincare",
        tags: ["Serum", "Vitamin C", "Brightening"],
    },
    {
        id: 5,
        name: "Exfoliating Scrub",
        brand: "Pure Skin",
        price: 22.99,
        rating: 4.3,
        images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
        category: "Skincare",
        tags: ["Exfoliator", "Scrub", "Face"],
    },
    {
        id: 6,
        name: "Eyeshadow Palette",
        brand: "Color Pop",
        price: 32.99,
        rating: 4.6,
        images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
        category: "Makeup",
        tags: ["Eyes", "Eyeshadow", "Palette"],
    },
    {
        id: 7,
        name: "Cleansing Oil",
        brand: "Pure Skin",
        price: 19.99,
        rating: 4.4,
        images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
        category: "Skincare",
        tags: ["Cleanser", "Oil", "Face"],
    },
    {
        id: 8,
        name: "Setting Powder",
        brand: "Flawless Face",
        price: 21.99,
        rating: 4.1,
        images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
        category: "Makeup",
        tags: ["Face", "Powder", "Setting"],
    },
]



export const testimonials = [
    { id: 1, name: "Emma C.", title: "Pretty (Honest Review)", rating: 5, review: "When I discover a viral product of Rare...", image: "category4.webp" },
    { id: 2, name: "Aimen F.", title: "Obsessed", rating: 4, review: "I'm obsessed with this tinted lip oil! It leaves a beautiful...", image: "category3.webp" },
    { id: 3, name: "M S.", title: "Pillow Talk - nude pink", rating: 5, review: "This lipstick glides on effortlessly and has a lovely...", image: "category2.avif" },
    { id: 4, name: "Janna H.", title: "Very pretty", rating: 3, review: "Very satisfied", image: "category4.webp" },
    { id: 5, name: "Khadija U.", title: "Eidi well spent", rating: 5, review: "Loving this blush, color is so nice...", image: "category4.webp" },
    { id: 6, name: "Khadija U.", title: "Eidi well spent", rating: 2, review: "Loving this blush, color is so nice...", image: "category6.png" },
    { id: 7, name: "Khadija U.", title: "Eidi well spent", rating: 5, review: "Loving this blush, color is so nice...", image: "category4.webp" },
    { id: 8, name: "Khadija U.", title: "Eidi well spent", rating: 4, review: "Loving this blush, color is so nice...", image: "category4.webp" },
    { id: 9, name: "Khadija U.", title: "Eidi well spent", rating: 5, review: "Loving this blush, color is so nice...", image: "category5.webp" },
    { id: 10, name: "Khadija U.", title: "Eidi well spent", rating: 4, review: "Loving this blush, color is so nice...", image: "category4.webp" },
    { id: 11, name: "Khadija U.11", title: "Eidi well spent", rating: 3, review: "Loving this blush, color is so nice...", image: "category5.webp" },
];


export const navItems = [
    { title: 'HOME', link: '/' },
    {
        title: "Contact",
        link: "/contact"
    },
    {
        title: "About Us",
        link: "/about"
    },
    {
        title: "Categories",
        link: "/categories",
    },
    {
        title: 'SHOP',
        link: '#',
        dropdown: ['Makeup', 'Skincare', 'Accessories', 'Haircare', 'Beauty Tools', 'Bath & Body']
    },
    // {
    //     title: 'FACE',
    //     link: '#',
    //     dropdown: ['Foundation', 'Blush', 'Highlighter', 'Primer', 'Concealer', 'Setting Spray']
    // },
    // {
    //     title: 'EYES',
    //     link: '#',
    //     dropdown: ['Mascara', 'Eyeliner', 'Eyeshadow', 'Eyebrow Pencil', 'False Lashes', 'Eye Primer']
    // },
    // {
    //     title: 'LIPS',
    //     link: '#',
    //     dropdown: ['Lipstick', 'Lip Gloss', 'Lip Liner', 'Lip Balm', 'Lip Stain', 'Lip Scrub']
    // },
    // {
    //     title: 'NAIL IT',
    //     link: '#',
    //     dropdown: ['Nail Polish', 'Nail Art', 'Manicure Kits', 'Nail Extensions', 'Cuticle Care', 'Nail Strengthener']
    // },
    // {
    //     title: 'FRAGRANCES',
    //     link: '#',
    //     dropdown: ['Perfume', 'Body Mist', 'Cologne', 'Essential Oils', 'Roll-on Perfume', 'Aromatherapy']
    // },
    // {
    //     title: 'BUNDLES',
    //     link: '#',
    //     dropdown: ['Makeup Sets', 'Gift Packs', 'Beauty Kits', 'Skincare Combos', 'Haircare Bundles', 'Wellness Kits']
    // }
];

export const categories = [
    { name: ' Face Wash', img: '/category/category1.webp' },
    { name: ' Fairness Cream ', img: '/category/category2.avif' },
    { name: 'Hair Gel & Mousse', img: '/category/category3.webp' },
    { name: 'Night Creams', img: '/category/category4.webp' },
    { name: 'Watches', img: '/category/category5.webp' },
    { name: 'Eye Care', img: '/category/category6.png' },
    { name: 'Lotion', img: '/category/category7.webp' },
    { name: 'Face Mask & Sheets', img: '/category/category8.avif' },
    { name: 'Shampoo & Conditioner', img: '/category/category9.webp' },
    { name: 'Fragrance', img: '/category/category10.avif' },
];

export const productCategories = [
    {
        id: 1,
        name: "Facewash",
        description: "Cleansers, scrubs, and face washes",
        icon: Waves,
        color: "bg-cyan-50 dark:bg-cyan-950",
        textColor: "text-cyan-600 dark:text-cyan-400",
        borderColor: "border-cyan-200 dark:border-cyan-800",
        hoverColor: "group-hover:bg-cyan-950 dark:group-hover:bg-cyan-900",
        href: "/categories?category=face wash",
    },
    {
        id: 2,
        name: "Makeup",
        description: "Foundations, lipsticks, and eye products",
        icon: Palette,
        color: "bg-pink-50 dark:bg-pink-950",
        textColor: "text-pink-600 dark:text-pink-400",
        borderColor: "border-pink-200 dark:border-pink-800",
        hoverColor: "group-hover:bg-pink-100 dark:group-hover:bg-pink-900",
        href: "/categories?category=makeup",
    },
    {
        id: 3,
        name: "Haircare",
        description: "Shampoos, conditioners, and styling",
        icon: Scissors,
        color: "bg-amber-50 dark:bg-amber-950",
        textColor: "text-amber-600 dark:text-amber-400",
        borderColor: "border-amber-200 dark:border-amber-800",
        hoverColor: "group-hover:bg-amber-100 dark:group-hover:bg-amber-900",
        href: "/categories?category=haircare",
    },
    {
        id: 4,
        name: "Fragrances",
        description: "Perfumes, colognes, and body mists",
        icon: Droplets,
        color: "bg-purple-50 dark:bg-purple-950",
        textColor: "text-purple-600 dark:text-purple-400",
        borderColor: "border-purple-200 dark:border-purple-800",
        hoverColor: "group-hover:bg-purple-100 dark:group-hover:bg-purple-900",
        href: "/categories?category=fragrance",
    },
    {
        id: 5,
        name: "Bath & Body",
        description: "Soaps, lotions, and body scrubs",
        icon: Shower,
        color: "bg-emerald-50 dark:bg-emerald-950",
        textColor: "text-emerald-600 dark:text-emerald-400",
        borderColor: "border-emerald-200 dark:border-emerald-800",
        hoverColor: "group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900",
        href: "/categories?category=bath & body",
    },
    {
        id: 6,
        name: "Tools & Accessories",
        description: "Brushes, sponges, and applicators",
        icon: Brush,
        color: "bg-rose-50 dark:bg-rose-950",
        textColor: "text-rose-600 dark:text-rose-400",
        borderColor: "border-rose-200 dark:border-rose-800",
        hoverColor: "group-hover:bg-rose-100 dark:group-hover:bg-rose-900",
        href: "/categories?category=tools & accessories",
    },
    // Creams
   
];


export const cards = [
    {
        id: 1,
        // content: <SkeletonOne />,
        className: "md:col-span-2 h-52",
        thumbnail: "/Hero-Section/Hero-7.avif",
    },
    {
        id: 2,
        // content: <SkeletonTwo />,
        className: "col-span-1 h-52",
        thumbnail: "/Hero-Section/Hero-8.avif",
    },
    {
        id: 3,
        // content: <SkeletonThree />,
        className: "col-span-1 h-52",
        thumbnail: "/Hero-Section/Hero-3.avif",
    },
    {
        id: 4,
        // content: <SkeletonFour />,
        className: "md:col-span-2 h-52",
        thumbnail: "/Hero-Section/Hero-4.avif",
    },
];
