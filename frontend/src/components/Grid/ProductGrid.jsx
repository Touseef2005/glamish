import { GlamishCard } from "@components/ProductCards/GlamishCard"
import { useResponsive } from "@/hooks"
export default function ProductGrid({ products }) {

    const smResponsive = useResponsive(576);
    const mdResponsive = useResponsive(1024);
    const lgResponsive = useResponsive(1280);

    const gridColumns = smResponsive ? 1 : (mdResponsive ? 2 : lgResponsive ? 3 : 4);

    return (
        <div className="flex-1">
            {/* Products */}
            {products?.length > 0 ? (
                <div className={`grid grid-cols-${gridColumns} gap-6`}>
                    {products.map((product) => (
                        <GlamishCard
                            key={product._id}
                            {...product}
                            imageProps={{
                                priority: products.indexOf(product) < 3
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-lg font-semibold">No products found</h3>
                </div>
            )}
        </div>
    );
}
