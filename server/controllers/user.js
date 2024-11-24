import { handleError } from "../error.js";
import User from "../models/Users.js";

export async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(handleError(404, "Sólo puedes actualizar tu propia cuenta."));
  }
}
