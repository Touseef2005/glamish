import Response from '../../../class/response.js';
import Model from "../models/index.js";

export default async function resetPasswordController(req, res) {
    const { token } = req.params;
    const { newPassword } = req.body;

    const response = new Response(res);

    if (!token || !newPassword) {
        return response.error([], "Token and new password are required", 400);
    }

    try {
        const user = await Model.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return response.error([], "Token is invalid or has expired", 400);
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        response.success([], "Password reset successful");

    } catch (error) {
        const messages = error.errors
            ? Object.values(error.errors).map(err => err.message)
            : [error.message];

        response.error(messages, "Failed to reset password", 500);
    }
}
