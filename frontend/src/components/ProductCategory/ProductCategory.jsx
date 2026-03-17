'use client';
import Image from 'next/image';
import { categories } from '@constant/index.js';

const ProductCategory = () => {
    return (
        <div className="container mx-auto p-8 sm:p-1 mt-[-140px]">
            <h2
                className="text-4xl font-bold mb-1 text-center"
                style={{
                    fontFamily: "poppins, serif",
                    letterSpacing: '2px',
                    color: '#2C3E50',
                    textTransform: 'uppercase',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                }}
            >
                Product Categories
            </h2>

            <p
                className="text-gray-700 text-center mb-8"
                style={{
                    fontFamily: "poppins, serif",
                    color: '#7F8C8D',
                }}
            >
                Discover our Products
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((category, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="w-full h-32 sm:h-48 md:h-48 lg:h-52 relative rounded-lg overflow-hidden">
                            <Image
                                src={category.img}
                                alt={category.name}
                                layout="fill"
                                objectFit="cover" // Use "cover" instead of "fit"
                                className="rounded-2xl"
                            />
                        </div>
                        <p
                            style={{
                                fontFamily: "poppins, serif",
                                letterSpacing: '2px',
                                color: '#2C3E50',
                                textTransform: 'uppercase',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                            }}
                            className="text-sm font-semibold text-center mt-2 mb-4 sm:mb-10"
                        >
                            {category.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCategory;