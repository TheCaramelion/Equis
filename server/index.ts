import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRouters from "./routes/users";
import authRouter from "./routes/auth";
import { mongoenv } from "./envcheck";

dotenv.config();

const app: Application = express();

function connect(): void {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(mongoenv())
    .then(() => {
      console.log("Conectado a la base de datos");
    })
    .catch((err) => {
      console.error("Error al conectar a la base de datos:", err.message);
      process.exit(1);
    });
}

app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRouters);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connect(); // Connect to the database
  console.log(`Escuchando al puerto ${PORT}`);
});
