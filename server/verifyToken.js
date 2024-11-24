import jwt from "jsonwebtoken";
import { handleError } from "./error.js";

export function verifyToken(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) return next(handleError(401, "No estás logeado"));

  jwt.verify(token, process.env.JWET, (err, user) => {
    if (err) return next(createError(403, "Token inválido"));
    req.user = user;
    next();
  });
}
