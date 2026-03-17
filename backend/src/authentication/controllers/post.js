import Response from '../../../class/response.js';
import postData from '../services/post.js';

const postController = async (req, res) => {
    const response = new Response(res);

    let user_create = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        number: req.body.phone,
        address: req.body.address,
    };

    try {
        const data = await postData(user_create);
        const token = data.getJwtToken();

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
            domain: "localhost"
        });

        delete data._doc.password;
        delete data._doc.__v;
        delete data._doc.createdAt;
        delete data._doc.updatedAt;

        return response.success(data, "Data Added successfully");

    } catch (error) {

        if (error.code == 11000) {
            return response.error("Email already exists", "Failed to add data");
        }

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
