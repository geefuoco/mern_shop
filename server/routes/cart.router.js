import { Router } from "express";
import cartController from "../controllers/cartController";
const router = Router();

router.get("/", cartController.viewCart);
router.post("/add/:id", cartController.addToCart);
router.get("/delete/:id", cartController.deleteItem);

export default router;
