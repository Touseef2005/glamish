import { Router } from "express";
import productRoute from "../src/products/router.js"
import authRoute from "../src/authentication/router.js"
import productReviewRoute from "../src/productReview/router.js"
import SubscribeRouter from "../src/SubscribeNewsLetter/router.js"
import OrderRoute from "../src/checkout/router.js"

const router = Router();

router.use('/product', productRoute)
router.use('/auth', authRoute)
router.use('/product_review', productReviewRoute)
router.use("/subscribe", SubscribeRouter)
router.use("/place-order", OrderRoute)

export default router;









































