
import { getPublicProduct } from "../db/index.js";

async function getPublicData({ limit, skip, search }) {
    return getPublicProduct({ limit, skip, search });
}

export default getPublicData;