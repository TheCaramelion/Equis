import { Router } from "express";
import { getUser, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = Router();

router.put(":/id", verifyToken, update);

router.get("/find/:id", getUser);

export default router;
