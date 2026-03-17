import { useEffect, useState } from "react";
import { Button } from "@components/shadcn-ui/button";
import { Checkbox } from "@components/shadcn-ui/checkbox";
import { Collapsible, CollapsibleContent } from "@/components/shadcn-ui/collapsible";
import { Label } from "@/components/shadcn-ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn-ui/radio-group";
import { Separator } from "@/components/shadcn-ui/separator";
import { Slider } from "@/components/shadcn-ui/slider";
import { Star } from "lucide-react";
import { motion } from "framer-motion"; // Importing framer-motion

export default function FilterSidebar({
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    selectedRating,
    setSelectedRating,
    applyFilters,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    categories,
}) {
    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const handleRatingChange = (value) => {
        setSelectedRating(Number.parseInt(value));
    };

    const [isSticky, setIsSticky] = useState(false);

    // Handle the scroll event to toggle sticky behavior
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 200); // Adjust the scroll position threshold as needed
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {/* Mobile filter button */}
            <div className="lg:hidden mb-4">
                <Button variant="outline" className="w-full" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}>
                    Filters
                </Button>
            </div>

            {/* Filters sidebar - mobile collapsible */}
            <Collapsible open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen} className="lg:hidden">
                <CollapsibleContent className="space-y-4 mb-6 bg-muted/40 p-4 rounded-lg">
                    <FilterCategories
                        categories={categories}
                        selectedCategories={selectedCategories}
                        handleCategoryChange={handleCategoryChange}
                        applyFilters={applyFilters}
                    />
                    <Separator />
                    <FilterPriceRange priceRange={priceRange} handlePriceChange={handlePriceChange} applyFilters={applyFilters} />
                    <Button className="w-full mt-4" onClick={applyFilters}>
                        Apply Filters
                    </Button>
                </CollapsibleContent>
            </Collapsible>

            {/* Filters sidebar - desktop */}
            <div className="lg:w-80 w-full">
                <div
                    className={`hidden lg:block w-64 space-y-6 ${isSticky ? "lg:sticky  lg:top-28 z-10" : ""}`}
                >
                    <div className="bg-muted/40 p-4 rounded-lg space-y-6">
                        <FilterCategories
                            categories={categories}
                            selectedCategories={selectedCategories}
                            handleCategoryChange={handleCategoryChange}
                            applyFilters={applyFilters}
                        />
                        <Separator />
                        <FilterPriceRange priceRange={priceRange} handlePriceChange={handlePriceChange} applyFilters={applyFilters} />
                        {/* <Separator /> */}
                        {/* <FilterRating selectedRating={selectedRating} handleRatingChange={handleRatingChange} applyFilters={applyFilters} /> */}
                    </div>
                </div>
            </div>
            
        </>
    );
}

const FilterCategories = ({ categories, selectedCategories, handleCategoryChange, applyFilters }) => (
    <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="space-y-2">
            {categories.length > 0 && categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => {
                            handleCategoryChange(category);
                            applyFilters();
                        }}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                        {category}
                    </Label>
                </div>
            ))}
        </div>
    </div>
);

const FilterPriceRange = ({ priceRange, handlePriceChange, applyFilters }) => (
    <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="px-2">
            <Slider
                defaultValue={[0, 200]}
                max={200}
                step={1}
                value={priceRange}
                onValueChange={(value) => {
                    handlePriceChange(value);
                    applyFilters();
                }}
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
            </div>
        </div>
    </div>
);

const FilterRating = ({ selectedRating, handleRatingChange, applyFilters }) => (
    <div>
        <h3 className="font-semibold mb-2">Rating</h3>
        <RadioGroup value={selectedRating?.toString() || ""} onValueChange={(value) => { handleRatingChange(value); applyFilters(); }}>
            {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                    <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`} className="flex items-center">
                        {Array(rating).fill(null).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                        {Array(5 - rating).fill(null).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-muted-foreground" />
                        ))}
                        <span className="ml-1">& Up</span>
                    </Label>
                </div>
            ))}
        </RadioGroup>
    </div>
);
