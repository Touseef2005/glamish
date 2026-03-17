
import { BASIC_URL } from "@/lib/config";
import axios from "axios";

const ApiUrl = BASIC_URL;

const ApiService = async (method, endpoint, data = {}, token = "") => {

    try {

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios({
            method,
            withCredentials: true,
            url: `${ApiUrl}/api/${endpoint}`,
            data,
            headers,
        });

        return response.data;
    } catch (error) {
        const errorResponse = error.response
            ? error.response.data
            : { message: "An error occurred", error };

        throw errorResponse;
    }

}

export default ApiService;
