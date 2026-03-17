import { redis } from "../server.js"

class Response {
    constructor(res) {
        this.res = res;
        this.redis = redis;
    }

    async success(data = {}, message = "Fetched Successfully", statusCode = 200, cacheKey = null) {
        if (cacheKey) {
            await this.redis.set(cacheKey, JSON.stringify(data), "EX", process.env.NODE_ENV === "production" ? 3600 : 60);
            console.log("✅ Cache Set");
        }
        
        this.res.status(statusCode).json({
            status: 1,
            message,
            data,
        });
    }


    error(data = {}, message = "An error occurred", statusCode = 400) {
        this.res.status(statusCode).json({
            status: 0,
            message,
            error: data,
        });
    }
}

export default Response;