import { Router } from "express";
import stripeController from "../controllers/stripeController";
const router = Router();

router.post("/create-checkout-session", stripeController.createCheckoutSession);

router.get("/checkout-session", stripeController.getCheckoutSession);

export default router;
