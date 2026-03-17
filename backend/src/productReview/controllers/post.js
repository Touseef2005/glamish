import postData from "../services/post.js";
import Response from "../../../class/response.js";
import { decodeVerifiedToken } from "../../../utils/index.js";
import { getById } from "../../authentication/db/index.js";
import getDataById from "../../products/services/getById.js";
import getByIdService from "../services/getById.js";

export default async function postController(req, res) {
    const response = new Response(res);


    try {
        const { _id } = decodeVerifiedToken(req.headers.authorization);
        const { productId, reviewMessage, rating } = req.body;

        const [user, product, existingReview] = await Promise.all([
            getById(_id),
            getDataById(productId),
            getByIdService(productId),
        ]);

        if (!user) return response.error({}, "User not found");
        if (!product) return response.error({}, "Product not found");

        if (existingReview) {
            if (existingReview.reviews.some(r => r.userId.toString() === user._id.toString())) {
                return response.error({}, "Product already reviewed");
            }

            existingReview.reviews.push({ userId: user._id, name: user.name, reviewMessage, rating });

            await product.updateOne({
                $set: {
                    averageRating: existingReview.reviews.reduce((acc, rev) => acc + rev.rating, 0) / existingReview.reviews.length,
                    totalReviews: existingReview.reviews.length
                }
            });

            await Promise.all([existingReview.save()]);

            await response.redis.del(`reviews_${productId}_limit10_skip0`);
            await response.redis.del("allPublishedProducts");

            return response.success(existingReview, "Review added successfully");
        }

        const newReview = await postData({
            productId: product._id,
            reviews: [{ userId: user._id, name: user.name, reviewMessage, rating }],
        });

        await product.updateOne({
            $set: {
                averageRating: rating,
                totalReviews: 1
            }
        });

        await response.redis.del(`reviews_${productId}_limit10_skip0`);
        await response.redis.del("allPublishedProducts");

        return response.success(newReview, "Review added successfully");
    } catch (error) {
        return response.error(error.errors
            ? Object.values(error.errors).map(e => e.message)
            : [error.message], "Failed to fetch data");
    }
}
