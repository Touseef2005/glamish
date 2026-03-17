import Response from '../../../class/response.js';
import { generateToken } from '../../../utils/index.js';
import Model from '../models/index.js';

const loginController = async (req, res) => {
    const response = new Response(res);

    const { email, password } = req.body;

    if (!email || !password) {
        return response.error([], "Email and password are required", 400);
    }

    try {

        const user = await Model.findOne({ email }).select("+password");
        if (!user) {
            return response.error([], "User not found", 404);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return response.error([], "Password is incorrect", 401);
        }

        const token = generateToken(user);

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 24 * 60 * 60 * 1000,
            domain: "localhost",
        });



        const userData = { ...user._doc };
        userData.token = token;

        delete userData.password;
        delete userData.__v;

        return response.success(userData, "Login successfully");
    } catch (error) {

        const errorMessages = error.errors
            ? Object.values(error.errors).map((err) => err.message)
            : [error.message];

        return response.error(errorMessages, "Failed to login", 500);
    }
};

export default loginController;
