import { Router } from "express";
import cartController from "../controllers/cartController";
const router = Router();

router.get("/", cartController.viewCart);
router.post("/add/:id", cartController.addToCart);
router.get("/delete/:id", cartController.deleteItem);
router.get("/increment/:id", cartController.incrementItem);
router.get("/decrement/:id", cartController.decrementItem);

export default router;
