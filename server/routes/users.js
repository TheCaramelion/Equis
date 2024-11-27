import { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  follow,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = Router();

router.put("/:id", verifyToken, updateUser);

router.get("/find/:id", getUser);

router.delete("/:id", verifyToken, deleteUser);

router.put("/follow/:id", verifyToken, follow);

export default router;
