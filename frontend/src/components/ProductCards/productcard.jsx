"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaShoppingCart, FaArrowLeft, FaArrowRight, FaStar, FaRegStar, FaPlus } from "react-icons/fa";
import { ButtonPrimaryWithIcon } from "@components/Buttons/index";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ products, heading, description, loading, error }) => {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [showScrollButtons, setShowScrollButtons] = useState(false);

    // Scroll position checker
    const checkScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }, []);

    // Scroll handler with card width calculation
    const handleScroll = useCallback((direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const card = container.firstChild;
        const scrollAmount = (card?.offsetWidth || 300) + 32; // Card width + gap

        container.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Initial scroll check
        checkScroll();

        // Event listeners
        container.addEventListener('scroll', checkScroll);
        const isTouchDevice = 'ontouchstart' in window;
        setShowScrollButtons(!isTouchDevice);

        return () => container.removeEventListener('scroll', checkScroll);
    }, [checkScroll, handleScroll]);

    if (error) return <Error message={error} />;
    // if (loading) return <Loading />;
    // if (!products?.length) return <Empty message="No products found" />;

    return (
        <div className="w-full px-4 md:px-8 mt-8 relative">
            <header className="text-center mb-6">
                <h2 className="md:text-xl text-3xl font-bold mb-2">{heading}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
            </header>

            {loading ? <Loading /> : <div className="relative">
                {showScrollButtons && (
                    <div className="absolute right-0 -top-14 space-x-2">
                        <ScrollButton
                            direction="prev"
                            onClick={handleScroll}
                            disabled={!canScrollLeft}
                        />
                        <ScrollButton
                            direction="next"
                            onClick={handleScroll}
                            disabled={!canScrollRight}
                        />
                    </div>
                )}

                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
                >
                    {products?.map(product => (
                        <ProductItem key={product._id} product={product} />
                    ))}
                </div>
            </div>}

            {
                products?.length == 0 && (
                    <Empty message="No products found" />
                )
            }
        </div>
    );
};

const ProductItem = ({ product }) => {
    const discountPercentage = Math.round(
        ((product.productPrice - product.price) / product.productPrice) * 100
    );

    return (
        <Link
            href={`/product/${product._id}`}
            className="flex-shrink-0 w-48 sm:w-56 md:w-64 snap-start bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
            <div className="relative">
                {discountPercentage > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-20">
                        {discountPercentage}% OFF
                    </span>
                )}

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic
                    }}
                    className="absolute z-20 bottom-2 right-2 sm:hidden text-black p-2 rounded-full shadow-md hover:bg-gray-200 border transition"
                >
                    <FaPlus className="w-4 h-4" />
                </button>

                <div className="relative h-36 sm:h-40 md:h-48 rounded-t-xl overflow-hidden">
                    <Image
                        src={product.images[0]?.url || '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                    />
                </div>

                <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-sm md:text-base text-gray-800 truncate">{product.name}</h3>

                    <div className="mt-2 flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-base md:text-lg font-bold text-gray-900">
                                PKR: {product.price.toLocaleString()}
                            </span>
                            {product.productPrice > product.price && (
                                <span className="ml-2 text-xs md:text-sm text-gray-500 line-through">
                                    PKR: {product.productPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                        <span className="text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                            {product.category}
                        </span>
                    </div>

                    <div className="mt-2 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            i < Math.floor(product.averageRating) ? (
                                <FaStar key={i} className="text-yellow-400 w-3 h-3 md:w-4 md:h-4" />
                            ) : (
                                <FaRegStar key={i} className="text-gray-300 w-3 h-3 md:w-4 md:h-4" />
                            )
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

const ScrollButton = ({ direction, onClick, disabled }) => (
    <button
        onClick={() => onClick(direction)}
        disabled={disabled}
        className={`p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
    >
        {direction === 'prev' ? (
            <FaArrowLeft className="text-lg text-gray-700" />
        ) : (
            <FaArrowRight className="text-lg text-gray-700" />
        )}
    </button>
);

// Helper Components
const Error = ({ message }) => <div className="text-red-500 p-4 text-center">{message}</div>;
const Loading = () => <div className="text-gray-500 p-4 text-center">Loading...</div>;
const Empty = ({ message }) => <div className="text-gray-500 p-4 text-center">{message}</div>;

export default ProductCard;