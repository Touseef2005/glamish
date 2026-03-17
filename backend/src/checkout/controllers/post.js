import Response from '../../../class/response.js';
import sendEmail from '../../../utils/retriveEmail.js';
import postData from '../services/post.js';
import { orderTemp } from "../../../email-template/Order.js"

const postController = async (req, res) => {
    const response = new Response(res);

    const {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postalCode,
        total,
        paymentMethod
    } = req.body

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !postalCode ||
        !total ||
        !paymentMethod
    ) {
        return response.error({}, 'All fields are required');
    }

    try {

        const orderGenerate = await postData(req.body);
        if (!orderGenerate) {
            return response.error({}, 'Failed to generate order');
        }

        await sendEmail({
            data: orderGenerate,
            customerEmail: email,
            template: orderTemp,
            subject: 'Order Confirmation'
        })
        await sendEmail({
            data: orderGenerate,
            customerEmail: "touseefabid737@gmail.com",
            template: orderTemp,
            subject: 'Order Received'
        })

        return response.success(orderGenerate, 'order generated successfully');
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

export default postController;