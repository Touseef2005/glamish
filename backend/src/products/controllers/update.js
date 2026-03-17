import Response from '../../../class/response.js';
import updateData from "../services/update.js"
import getDataById from "../services/getById.js"
import { decodeVerifiedToken } from "../../../utils/index.js"

const updateController = async (req, res) => {
    const response = new Response(res);

    const { id } = req.params;
    const { name, description, category, brand, discountPrice, productPrice, stock, unit, sku, shippingCost, shippingTime, featuredProduct, published, tags } = req.body;


    let { _id, role } = decodeVerifiedToken(req.headers.authorization)

    if (role !== 'admin') {
        return response.error("You are not authorized to add product");
    }


    try {

        if (Object.keys(req.body).length === 0) {
            return response.error(null, "Please provide data to update");
        }


        const existingProduct = await getDataById(id);
        if (!existingProduct) {
            return response.error(null, "Product not found");
        }


        const existingPrice = existingProduct?.productPrice ?? 0;
        const existingDiscount = existingProduct?.discountPrice ?? 0;

        const finalPrice =
            productPrice !== undefined && discountPrice !== undefined ? productPrice - discountPrice :
                productPrice !== undefined ? productPrice - existingDiscount :
                    discountPrice !== undefined ? existingPrice - discountPrice :
                        existingProduct?.price ?? 0;


        const updateResponse = {
            name,
            description,
            category,
            brand,
            discountPrice,
            productPrice,
            price: Number(finalPrice),
            stock,
            unit,
            sku,
            shippingCost,
            shippingTime,
            isFeatured: featuredProduct,
            isPublished: published,
            tags
        };

        const updatedProduct = await updateData(id, updateResponse);
        if (!updatedProduct) {
            return response.error(null, "Product Credentials are not found");
        }

        await response.redis.del("allProducts");
        await response.redis.del("allPublishedProducts");
        await response.redis.del("allUnpublishedProducts");
        await response.redis.del(id);


        return response.success(updatedProduct, 'Data added successfully');
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

        return response.error(messages, "Product updation failed");
    }
}

export default updateController;