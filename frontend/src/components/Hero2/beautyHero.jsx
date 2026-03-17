import { memo, useMemo } from 'react';
import { LayoutGrid } from "@components/Grid/HeroGrid";
import { useResponsive } from "@/hooks";
import { PackageSearch } from "lucide-react";
import { cards as staticCards } from "@constant/index";
import { ButtonPrimaryWithIcon } from "@components/Buttons/index";

const MemoizedButton = memo(ButtonPrimaryWithIcon);
const MemoizedLayoutGrid = memo(LayoutGrid);
const MemoizedPackageSearch = memo(PackageSearch);

const SEOHeading = memo(({ children }) => (
    <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
        {children}
    </h1>
));

const BeautyHero = () => {
    const responsive = useResponsive(767);

    const containerClasses = useMemo(() =>
        `${responsive ? "mt-10" : ""} w-full overflow-hidden bg-white px-4 md:px-6 lg:px-8`,
        [responsive]
    );

    const cards = useMemo(() => staticCards, []);

    const headerContent = useMemo(() => (
        <>
            <div className="w-44 text-center rounded-full bg-peach-100 px-4 py-1 text-xs font-medium text-peach-600">
                100% Organic Products
            </div>
            <div>
                <SEOHeading>
                    Luxurious Skincare &{" "}
                    <span className="relative">
                        Cosmetic{" "}
                        <span className="absolute bottom-0 left-0 h-1 w-full bg-lavender-default"></span>
                    </span>{" "}
                    Solutions
                </SEOHeading>
                <p className="mt-4 text-muted-foreground font-poppins">
                    Discover our exclusive range of skincare and cosmetic products, formulated with organic ingredients to enhance your natural beauty. Our products are crafted with care to give you the best in beauty and wellness. Experience the luxury today!
                </p>
            </div>
        </>
    ), []);

    const ctaButton = useMemo(() => (
        <MemoizedButton
            size="lg"
            className="rounded-full !bg-peach-500 hover:!text-white hover:!bg-peach-600 !border-none " aria-label="Shop Premium Beauty Products"
            onClick={() => console.log("Browse best beauty products")}
            title='Shop Premium Beauty Products'
            icon={<MemoizedPackageSearch className="h-4 w-4" />}
            href="/products"
        />
    ), []);

    return (
        <section className={containerClasses} itemScope itemType="http://schema.org/Service">
            <div className="mx-auto max-w-7xl sm:mt-10">
                <div className="grid gap-8 md:grid-cols-2">
                    <article className="font-quicksand flex flex-col justify-center space-y-6">
                        {headerContent}
                        <div className="flex flex-wrap gap-4">
                            {ctaButton}
                        </div>
                    </article>

                    {/* Only render LayoutGrid on larger screens */}
                    {!responsive && (
                        <div className="relative" itemScope itemType="http://schema.org/ImageGallery">
                            <MemoizedLayoutGrid cards={cards} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default memo(BeautyHero);
