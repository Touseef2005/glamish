import { Star } from "lucide-react"
import { memo } from "react"
import { Button } from "../shadcn-ui/button"

export const ProductSections = memo(({ product }) => {
    return (
        <div className="mt-16 space-y-12">
            {/* Description Section */}


            {/* Ingredients Section */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Ingredients</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                                    <span>Vitamin E - Antioxidant protection</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                                    <span>Hyaluronic Acid - Deep hydration</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                                    <span>Natural Extracts - Skin nourishment</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                                    <span>SPF Protection - UV defense</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                                    <span>Long-lasting coverage</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                                    <span>Suitable for sensitive skin</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                                    <span>Non-comedogenic formula</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                                    <span>Dermatologically tested</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < Math.floor(product.averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-600">
                            {product.averageRating} out of 5 ({product.totalReviews} reviews)
                        </span>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Sample Reviews */}
                    {[
                        {
                            name: "Sarah Johnson",
                            rating: 5,
                            date: "2 weeks ago",
                            comment: "Amazing product! The coverage is perfect and it lasts all day. Highly recommended!",
                        },
                        {
                            name: "Emily Chen",
                            rating: 4,
                            date: "1 month ago",
                            comment: "Great quality and the shade matches perfectly. Will definitely repurchase.",
                        },
                        {
                            name: "Jessica Brown",
                            rating: 5,
                            date: "3 weeks ago",
                            comment: "Love this product! It doesn't irritate my sensitive skin and gives beautiful coverage.",
                        },
                    ].map((review, index) => (
                        <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{review.name}</p>
                                        <p className="text-sm text-gray-500">{review.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <Button
                        variant="outline"
                        className="w-full"
                        disabled={product.totalReviews == 0}
                    >
                        View All Reviews ({product.totalReviews})
                    </Button>
                </div>
            </section>
        </div>
    )
})