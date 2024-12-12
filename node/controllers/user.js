import { handleError } from "../error.js";
import User from "../models/Users.js";
import jwt from "jsonwebtoken";

export async function getUser(req, res, next) {
  try {
    res.status(200).json(await User.findById(req.params.id));
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    if (req.params.id !== req.user.id) {
      return next(handleError(403, "Sólo puedes actualizar tu propia cuenta."));
    }

    res
      .status(200)
      .json(
        await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        )
      );
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    if (req.params.id !== req.user.id) {
      return next(handleError(403, "Sólo puedes borrar to propia cuenta."));
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cuenta borrada." });
  } catch (err) {
    next(err);
  }
}

export async function follow(req, res, next) {
  if (req.params.id === req.user.id) {
    try {
      const user = await User.findById(req.params.id);

      const currentUser = await User.findById(req.body.id);

      if (!user.followers.includes(req.body.id)) {
        await user.updateOne({
          $push: { followers: req.body.id },
        });

        await currentUser.updateOne({
          $push: { following: req.params.id },
        });
      } else {
        res.status(403).json("Ya estás siguiendo este usuario.");
      }
      res.status(200).json("Siguiendo al usuario.");
    } catch (err) {
      next(err);
    }
  } else
    return next(
      handleError(403, "Sólo puedes seguir a alguien con tu propia cuenta.")
    );
}

export async function unfollow(req, res, next) {
  if (req.params.id === req.user.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.id);

      if (currentUser.following.includes(req.params.id)) {
        await user.updateOne({
          $pull: { followers: req.body.id },
        });

        await currentUser.updateOne({
          $pull: { following: req.params.id },
        });
      } else {
        res.status(403).json("No estás siguiendo este usuario.");
      }
      res.status(200).json("Dejando de seguir al usuario.");
    } catch (err) {
      next(err);
    }
  } else
    return next(
      handleError(403, "Sólo puedes seguir a alguien con tu propia cuenta.")
    );
}

export async function fetchUserData(req, res, next) {
  try {
    const res = await axios.get("auth/user", {
      withCredentials: true,
    });
    console.log("Datos: ", res.data);
  } catch (err) {
    console.log("Error: ", err);
  }
}

export async function getUserData(req, res, next) {
  try {
    const token = req.cookies.access_token;

    if (!token)
      return res.status(401).json({ message: "No se ha encontrado token" });

    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decoded.id);
    res.status(200).json(user);
    return user;
  } catch {
    res.status(500).json({ message: "Error" });
  }
}
