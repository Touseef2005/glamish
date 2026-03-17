import Response from '../../../class/response.js';
import getData from "../services/get.js"
import ProductModel from "../models/index.js"
import { fallbackHandler } from '../../../utils/index.js'

const getController = async (req, res) => {
    const response = new Response(res);

    const { limit, skip } = req.query;

    let recordsLimit = parseInt(limit) || 20;
    let recordsSkip = parseInt(skip) || 0;

    if (recordsLimit > 20) recordsLimit = 20;
    if (recordsLimit < 5) recordsLimit = 5;

    try {

        const allowedFilters = ["name", "category", "brand"];
        const search = Object.fromEntries(
            Object.entries(req.query)
                .filter(([key]) => allowedFilters.includes(key))
                .map(([key, value]) => [key, { $regex: String(value), $options: "i" }])
        );

        const isDefaultCondition = recordsLimit === 20 && recordsSkip === 0 && Object.keys(search).length === 0;

        const cacheKey = isDefaultCondition
            ? "allProducts"
            : `allProducts_limit_${recordsLimit}_skip_${recordsSkip}_search_${JSON.stringify(search)}`;

       
        const dataPaginate = await fallbackHandler({
            redisClient: response.redis,
            cacheKey: cacheKey,
            cacheTTL: 3600,
            dbFetchFunction: async () => {
                const products = await getData({ limit: recordsLimit, skip: recordsSkip, search });
                const totalProducts = await ProductModel.countDocuments(search);
                return { products, total: totalProducts, limit: recordsLimit, skip: recordsSkip };
            },
        });

        return response.success(dataPaginate, "Data Get Successfully");

    } catch (error) {

        let messages = [];
        if (error.errors) {
            for (let field in error.errors) {
                messages.push(error.errors[field].message);
            }
        } else {
            messages.push(error.message);
        }

        return response.error(messages, "Internal Server Error", 500);
    }
}

export default getController;
