import { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  follow,
  unfollow,
} from "../controllers/user.js";
import { verifyToken } from "../public/verifyToken.js";

const router = Router();

router.put("/:id", verifyToken, updateUser);

router.get("/find/:id", getUser);

router.delete("/:id", verifyToken, deleteUser);

router.put("/follow/:id", verifyToken, follow);

router.put("/unfollow/:id", verifyToken, unfollow);

export default router;
