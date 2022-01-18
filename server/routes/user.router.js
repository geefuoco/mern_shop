import { Router } from "express";
import usersController from "../controllers/usersController";
const router = Router();

router.post("/signin", usersController.signin);

router.post("/signup", usersController.signup);

router.post("/logout", usersController.logout);

router.get("/authorize", usersController.authorize);

export default router;
