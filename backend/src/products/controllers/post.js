import Response from '../../../class/response.js';
import { uploadImageToCloudinary, deleteCloudinaryImages } from '../../../Upload Cloudinary/index.js';
import { decodeVerifiedToken } from "../../../utils/index.js"
import postData from '../services/post.js';



const postController = async (req, res) => {

    const response = new Response(res);

    let { _id, role } = decodeVerifiedToken(req.headers.authorization)

    if (role !== 'admin') {
        return response.error("You are not authorized to add product");
    }

    const { name, description, category, brand, productPrice, discountPrice, sku, stock, unit, video, shippingCost, shippingTime, isPublished, tags, warranty } = req.body;

    const addProduct = {
        name,
        description,
        category,
        brand,
        productPrice,
        discountPrice,
        sku,
        stock,
        unit,
        video,
        sellerId: _id,
        shippingCost,
        shippingTime,
        isPublished,
        tags,
        warranty
    }


    let uploadedImages = [];

    try {

        const finalPrice = productPrice ? productPrice - discountPrice : 0;
        addProduct.price = finalPrice;
        uploadedImages = await uploadImageToCloudinary({ imageBuffer: req.files.map(file => file.buffer) });
        addProduct.images = uploadedImages.map(img => ({
            url: img.secure_url,
            public_id: img.public_id
        }));

        const newProduct = await postData(addProduct);
        if (!newProduct) {
            return response.error(null, 'Product creation failed');
        }

        await response.redis.del("allProducts");
        await response.redis.del("allPublishedProducts");
        await response.redis.del("allUnpublishedProducts");

        return response.success(newProduct, 'Data added successfully');
    } catch (error) {

        if (uploadedImages?.length > 0) {
            const publicIds = uploadedImages.map(img => img.public_id);
            await deleteCloudinaryImages(publicIds)
                .then(() => console.log("success deleted"))
                .catch(error => console.error('Cloudinary cleanup failed:', error));
        }

        let messages = [];
        if (error.name === 'ValidationError' && error.errors) {
            for (const field in error.errors) {
                messages.push(error.errors[field].message);
            }
        }
        else if (error.message.includes('Cloudinary')) {
            messages.push('Image upload failed: ' + error.message);
        }
        else {
            messages.push(error.message);
        }

        return response.error(messages, "Product creation failed");
    }
}

export default postController;