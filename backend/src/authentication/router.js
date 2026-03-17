import { Router } from "express";
import loginController from "./controllers/login.js";
import postController from "./controllers/post.js";
import deleteController from "./controllers/delete.js";
import updateController from "./controllers/update.js";
import verifyToken from "../../middleware/index.js";
import getByIdController from "./controllers/getById.js"
import { validMongooseId } from "../../middleware/index.js"
import forgetPasswordController from "./controllers/forgetPassword.js";
import resetPasswordController from "./controllers/resetPassword.js";

const router = Router();

router.post("/signup", postController)
router.post("/login", loginController)
router.post("/forget", forgetPasswordController)
router.post("/reset/:token", resetPasswordController)
router.patch("/update", verifyToken, updateController)
router.delete("/delete", verifyToken, deleteController)

router.get("/get/:id", validMongooseId, getByIdController)

export default router;