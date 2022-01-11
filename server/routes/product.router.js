import { Router } from "express";
import productsController from "../controllers/productsController";
const router = Router();

router.get("/", productsController.index);
router.get("/:id", productsController.show);

export default router;
