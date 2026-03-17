import Response from '../../../class/response.js';
import Model from "../models/index.js";
import sendEmail from "../../../utils/retriveEmail.js";
import forgetPasswordTemp from '../../../email-template/Forget-Password.js';
export default async function forgetPasswordController(req, res) {
    const response = new Response(res);

    const { email } = req.body;

    try {
        if (!email) {
            return response.error([], "Email is required");
        }

        const isUser = await Model.findOne({ email });
        if (!isUser) {
            return response.error([], "User not found", 404);
        }

        const resetToken = Math.random().toString(36).slice(2);

        isUser.resetPasswordToken = resetToken;
        isUser.resetPasswordExpire = Date.now() + 3600000;

        await isUser.save();

        const resetUrl = `https://glamish-beauty.vercel.app/reset-password/${resetToken}`;

        await sendEmail({ data: { resetUrl }, customerEmail: email, template: forgetPasswordTemp, subject: "Reset Your Password" });

        return response.success({}, "Email sent successfully");

    } catch (error) {

        let messages = [];
        if (error.errors) {
            for (let field in error.errors) {
                messages.push(error.errors[field].message);
            }
        } else {
            messages.push(error.message);
        }

        response.error(messages, "Failed to fetch data");
    }

}