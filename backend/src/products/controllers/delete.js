import deleteData from '../services/delete.js';
import Response from '../../../class/response.js';
import { decodeVerifiedToken } from "../../../utils/index.js"


const deleteController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params;

    let { _id, role } = decodeVerifiedToken(req.headers.authorization)

    if (role !== 'admin') {
        return response.error("You are not authorized to add product");
    }

    try {

        const deleteRes = await deleteData(id);
        if (!deleteRes) {
            return response.error(null, 'Product deletion failed');
        }

        await response.redis.del("allProducts");
        await response.redis.del("allPublishedProducts");
        await response.redis.del("allUnpublishedProducts");
        await response.redis.del(id);


        return response.success(null, 'Product deleted successfully');
    } catch (error) {
        let messages = [];
        if (error.name === 'ValidationError' && error.errors) {
            for (const field in error.errors) {
                messages.push(error.errors[field].message);
            }
        }
        else {
            messages.push(error.message);
        }

        return response.error(messages, "Product deletion failed");
    }
}

export default deleteController;