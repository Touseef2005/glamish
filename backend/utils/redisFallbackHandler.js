export default async function fallbackHandler({
    redisClient,
    cacheKey,
    dbFetchFunction,
    cacheTTL = 3600,
}) {

    let data;

    try {

        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log(`✅ Returning Cached Data for ${cacheKey}`);
            return JSON.parse(cachedData);
        }
    } catch (redisError) {
        console.warn(`⚠️ Redis Fetch Error for ${cacheKey}:`, redisError.message);
    }

    try {

        data = await dbFetchFunction();
        if (!data) return null


        try {
            await redisClient.setex(cacheKey, cacheTTL, JSON.stringify(data));
        } catch (redisError) {
            console.warn(`⚠️ Redis Cache Error for ${cacheKey}:`, redisError.message);
        }
    } catch (dbError) {
        console.error(`❌ Database Fetch Error for ${cacheKey}:`, dbError.message);
        throw dbError;
    }

    return data;
};

