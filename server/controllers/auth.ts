import User from "../models/Users.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../error.ts";
import { jwtenv } from "../envcheck.ts";

export async function signup(req, res, next) {
  try {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, jwtenv());
    const { password, ...othersData } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(othersData);
  } catch (err) {
    next(err);
  }
}

export async function signin(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(handleError(404, "Usuario no encontrado"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(handleError(400, "Contraseña erronea"));

    const token = jwt.sign({ id: user._id }, jwtenv());
    const { password, ...othersData } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(othersData);
  } catch (err) {
    next(err);
  }
}
