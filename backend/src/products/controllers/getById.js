import Response from '../../../class/response.js';
import getDataById from "../services/getById.js"
import { fallbackHandler } from '../../../utils/index.js';

const getByIdController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params;

    try {

        const responseData = await fallbackHandler({
            redisClient: response.redis,
            cacheKey: id,
            cacheTTL: 3600,
            dbFetchFunction: async () => {
                return await getDataById(id);
            },
        });

        if (!responseData) {
            return response.error([], "Data not found, please provide a valid product id");
        }

        delete responseData.__v;

        return response.success(responseData, "Product fetched successfully", 200, id);
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
}

export default getByIdController;