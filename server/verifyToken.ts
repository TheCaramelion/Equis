import jwt from "jsonwebtoken";
import { handleError } from "./error.ts";
import { jwtenv } from "./envcheck.ts";

export function verifyToken(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) return next(handleError(401, "No estás logeado"));

  jwt.verify(token, jwtenv, (err, user) => {
    if (err) return next(handleError(403, "Token inválido"));
    req.user = user;
    next();
  });
}
