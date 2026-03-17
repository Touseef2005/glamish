'use client';

import Image from 'next/image';

const Banner = ({ category }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 max-w-full mx-auto mt-12">
      {category.map((category, index) => (
        <div
          key={index}
          className={`relative group overflow-hidden rounded-lg ${index === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1"
            }`}
        >
          <Image
            src={category}
            alt={category}
            width={600}
            height={200}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-transparent text-gray-200 text-sm font-semibold border-2 border-white px-3 py-0 rounded-sm hover:bg-white hover:text-black transition duration-300">
              {category.title} View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
