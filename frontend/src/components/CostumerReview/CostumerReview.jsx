"use client";

import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { testimonials } from "@constant/index"

const CostumerReview = () => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [cardWidth, setCardWidth] = useState(250); // Adjusted width
  const gap = 16; // Gap between cards

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newCardWidth = window.innerWidth < 768 ? containerWidth * 0.75 : 280; // Reduced width
        setCardWidth(newCardWidth);
        const totalWidth = testimonials.length * (newCardWidth + gap);
        setMaxScroll(Math.max(0, totalWidth - containerWidth + gap));
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - (cardWidth + gap), 0));
  };

  const scrollRight = () => {
    setScrollPosition((prev) => Math.min(prev + (cardWidth + gap), maxScroll));
  };

  return (
    <div className="relative max-w-7xl mx-auto px-2 py-16 ">
      <h2 style={{
        fontFamily: "poppins, serif",
        letterSpacing: '2px',
        color: '#2C3E50',
        textTransform: 'uppercase',
      }} className="text-center text-4xl font-bold">OUR CUSTOMER SPEAKS FOR US</h2>
      <p style={{
        fontFamily: "poppins, serif",
        color: '#7F8C8D'
      }} className="text-center text-gray-500 mb-4">PRODUCT REVIEWS</p>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10 ${scrollPosition === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={scrollPosition === 0}
        >
          <FaChevronLeft />
        </button>

        <div className="overflow-hidden " ref={containerRef}>
          <div
            className="flex gap-4 transition-transform duration-300  "
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white shadow-lg border border-gray-300  p-4 rounded-xl " style={{ minWidth: `${cardWidth}px`, height: "380px" }}>
                <img src={testimonial.image} alt={testimonial.name} className="h-56 w-full object-cover rounded-md" />
                <div className="mt-3">
                  <h3 className="font-bold">{testimonial.title}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.review}</p>
                  <div className="flex items-center mt-2 text-yellow-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} />

                    ))}
                  </div>
                  <p className="mt-2 font-semibold">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollRight}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10 ${scrollPosition >= maxScroll ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={scrollPosition >= maxScroll}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CostumerReview;
