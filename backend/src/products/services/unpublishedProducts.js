import { getUnpublishedProducts } from "../db/index.js";

export default async function getUnpublishedData ({ limit, skip, search })  {
    return await getUnpublishedProducts({ limit, skip, search });
}