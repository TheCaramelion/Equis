import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRouters from "./routes/users.js";
import authRouter from "./routes/auth.js";

const app = express();
dotenv.config();

function connect() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Conectado a la base de datos");
    })
    .catch((err) => {
      throw err;
    });
}

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRouters);
app.use("/api/auth", authRouter);

app.listen(8000, () => {
  connect();
  console.log("Escuchando al puerto 8000");
});
