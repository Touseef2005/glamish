import { Router } from "express";
import getController from "./controllers/get.js";
import postController from "./controllers/post.js";
import deleteController from "./controllers/delete.js";
import updateController from "./controllers/update.js";
import getByIdController from "./controllers/getById.js"
import getPublicProductController from "./controllers/getPublicProduct.js"
import getUnpublishedProductsController from "./controllers/getUnpublishedProducts.js"
import { validMongooseId, verifyToken, uploadMiddleware } from "../../middleware/index.js"

const router = Router();

router.get("/get", getController)
router.get("/get-published", getPublicProductController)
router.get("/get-unpublished", verifyToken, getUnpublishedProductsController)
router.post("/add", verifyToken, uploadMiddleware, postController)
router.patch("/update/:id", verifyToken, validMongooseId, updateController)
router.delete("/delete/:id", verifyToken, validMongooseId, deleteController)


router.get("/get/:id", validMongooseId, getByIdController)

export default router;