import Response from '../../../class/response.js';
import sendEmail from "../../../utils/retriveEmail.js";
import subscribeMailTemp from "../../../email-template/SubscribeMail.js";
import Model from "../models/index.js"

const saveSubscriber = async ({ email }) => {
    try {
        const existing = await Model.findOne({ email });
        if (existing) return true; // Already subscribed

        await Model.create({ email }); // Save new email
        return false; // New subscriber
    } catch (err) {
        // Optional: Handle specific duplicate error
        if (err.code === 11000) {
            return true;
        }
        throw err; // Let the controller handle it
    }
};

const SubscribeController = async (req, res) => {
    const response = new Response(res);
    const { email } = req.body;

    if (!email) {
        return response.error([], "Email is required", 400);
    }

    try {
        // Check & save email
        const isAlreadySubscribed = await saveSubscriber({ email });

        if (isAlreadySubscribed) {
            return response.success({}, 'You are already subscribed');
        }

        // Send email confirmation
        const emailSent = await sendEmail({
            data: { email },
            customerEmail: email,
            template: subscribeMailTemp,
            subject: "Subscription Confirmation"
        });

        if (!emailSent) {
            return response.error([], 'Subscription saved, but failed to send confirmation email');
        }

        return response.success({}, 'Subscribed and confirmation email sent successfully');
    } catch (err) {
        console.error("Subscribe Error:", err);
        return response.error([], 'An error occurred while subscribing', 500);
    }
};

export default SubscribeController;
