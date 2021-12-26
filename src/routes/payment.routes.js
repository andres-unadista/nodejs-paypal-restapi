import { Router } from "express";
import { createOrder, acceptOrder, cancelOrder } from "../controllers/payment.controller";

const router = Router();

router.post('/create-order', createOrder);
router.get('/accept-order', acceptOrder);
router.get('/cancel-order', cancelOrder);

export default router