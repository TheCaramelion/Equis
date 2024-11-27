import { handleError } from "../error.js";
import User from "../models/Users.js";

export async function getUser(req, res, next) {
  try {
    res.status(200).json(await User.findById(req.params.id));
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  if (req.params.id === req.user.id) {
    try {
      res.status(200).json(
        await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        )
      );
    } catch (err) {
      next(err);
    }
  } else
    return next(handleError(403, "Sólo puedes actualizar tu propia cuenta."));
}

export async function deleteUser(req, res, next) {
  if (req.params.id === req.user.id) {
    try {
      res.status(200).json(await User.findByIdAndDelete(req.params.id));
    } catch (err) {
      next(err);
    }
  } else return next(handleError(403, "Sólo puedes borrar tu propia cuenta."));
}

export async function follow(req, res, next) {
  if (req.params.id === req.user.id) {
    try {
    } catch (err) {
      next(err);
    }
  } else
    return next(
      handleError(403, "Sólo puedes seguir a alguien con tu propia cuenta.")
    );
}
