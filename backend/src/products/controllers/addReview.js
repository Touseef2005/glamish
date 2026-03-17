import Response from '../../../class/response.js';
import getDataById from "../services/getById.js"
import { decodeVerifiedToken } from "../../../utils/index.js"

export default async function addReview(req, res) {
    const response = new Response(res);

    const token = req.headers.authorization.split(' ')[1];
    let { _id, name } = decodeVerifiedToken(token)

    try {
        const { rating, comment } = req.body;
        const { id } = req.params;

        let product = await getDataById(id);

        if (!product) {
            return response.error({}, "Product not found")
        }

        const existingReview = product.reviews.find(
            (rev) => rev.user.toString() === _id.toString()
        );

        if (existingReview) {
            return response.error({}, "Product already reviewed")
        }

        const review = {
            user: _id,
            name: name,
            rating: Number(rating),
            comment,
        };

        product.reviews.push(review);

        product.numOfReviews = product.reviews.length;

        const totalRating = product.reviews.reduce((acc, rev) => acc + rev.rating, 0);
        product.ratings = totalRating / product.reviews.length;

        await product.save();

        return response.success(product, 'Review added successfully');

    } catch (error) {

        let messages = [];
        if (error.errors) {
            for (let field in error.errors) {
                messages.push(error.errors[field].message);
            }
        } else {
            messages.push(error.message);
        }

        return response.error(messages, "Failed to fetch data");
    }
};
