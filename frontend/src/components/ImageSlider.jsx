import { useRef, useEffect, useCallback } from "react";

const ImageSlider = ({ images, selectedImage, onSelect, width = "100%", height = "100px" }) => {
    const sliderRef = useRef(null);
    const isDragging = useRef(false);
    let clickPrevented = false;

    const startDragging = useCallback((e) => {
        isDragging.current = true;
        clickPrevented = true;
        const slider = sliderRef.current;
        slider.dataset.startX = e.pageX || e.touches[0].pageX;
        slider.dataset.scrollLeft = slider.scrollLeft;
    }, []);

    const stopDragging = useCallback(() => {
        isDragging.current = false;
        setTimeout(() => (clickPrevented = false), 100);
    }, []);

    const moveSlider = useCallback((e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const slider = sliderRef.current;
        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - slider.dataset.startX) * 1.5;
        slider.scrollLeft = slider.dataset.scrollLeft - walk;
    }, []);

    useEffect(() => {
        const slider = sliderRef.current;

        slider.addEventListener("mousedown", startDragging);
        slider.addEventListener("mouseup", stopDragging);
        slider.addEventListener("mouseleave", stopDragging);
        slider.addEventListener("mousemove", moveSlider);
        slider.addEventListener("touchstart", startDragging, { passive: true });
        slider.addEventListener("touchend", stopDragging);
        slider.addEventListener("touchmove", moveSlider, { passive: true });

        return () => {
            slider.removeEventListener("mousedown", startDragging);
            slider.removeEventListener("mouseup", stopDragging);
            slider.removeEventListener("mouseleave", stopDragging);
            slider.removeEventListener("mousemove", moveSlider);
            slider.removeEventListener("touchstart", startDragging);
            slider.removeEventListener("touchend", stopDragging);
            slider.removeEventListener("touchmove", moveSlider);
        };
    }, [startDragging, stopDragging, moveSlider]);


    return (
        <div
            ref={sliderRef}
            className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
            style={{
                width,
                height,
                whiteSpace: "nowrap",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                touchAction: "none",
            }}
        >
            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            {images?.map((image, index) => (
                <div
                    key={image._id}
                    className={`thumbnail ${selectedImage === image.url ? "active" : ""} snap-center flex-shrink-0 flex items-center justify-center`}
                    // className="snap-center flex-shrink-0 flex items-center justify-center" // Center content
                    style={{
                        width: height,
                        height,
                        padding: "2px"
                    }}
                >
                    {/* {console.log(image.url, "image.url")} */}

                    <img
                        src={image.url || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-contain rounded-md border bg-white hover:scale-105 transition-transform" // object-cover से object-contain में बदलें
                        // onClick={() => !clickPrevented && setSelectedImage(image.url)}
                        draggable="false"
                        onClick={() => onSelect(image.url)}
                    />
                </div>
            ))}
        </div>
    );
};

export default ImageSlider;
