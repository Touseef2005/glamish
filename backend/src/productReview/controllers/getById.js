import Response from "../../../class/response.js";
import getByIdService from "../services/getById.js";
import { isValidMongooseId } from "../../../utils/index.js";
import { fallbackHandler } from "../../../utils/index.js";

export default async function getByIdController(req, res) {
    const response = new Response(res);

    const { limit, skip } = req.query;
    const { id } = req.params;

    if (!isValidMongooseId(id)) {
        return response.error([], "Invalid ID");
    }

    let recordsLimit = parseInt(limit) || 10;
    let recordsSkip = parseInt(skip) || 0;

    if (recordsLimit > 20) recordsLimit = 20;
    if (recordsLimit < 5) recordsLimit = 1;


    const cacheKey = `reviews_${id}_limit${recordsLimit}_skip${recordsSkip}`;
    
    try {
        
        const dataPaginate = await fallbackHandler({
            redisClient: response.redis,
            cacheKey,
            cacheTTL: 3600,
            dbFetchFunction: async () => {
                const data = await getByIdService(id);
                if (!data) throw new Error("Data not found");

                const paginatedReviews = data.reviews.slice(recordsSkip, recordsSkip + recordsLimit);
                return {
                    _id: data._id,
                    productId: data.productId,
                    reviews: paginatedReviews,
                    totalReviews: data.reviews.length,
                    limit: recordsLimit,
                    skip: recordsSkip,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                };
            },
        });

        return response.success(dataPaginate, "Data Get Successfully", 200, cacheKey);
    } catch (error) {
        const messages = error.errors
            ? Object.values(error.errors).map(e => e.message)
            : [error.message];

        return response.error(messages, "Internal Server Error", 500);
    }
}
