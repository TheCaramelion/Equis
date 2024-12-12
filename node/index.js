import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRouters from "./routes/users.js";
import authRouter from "./routes/auth.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function connect() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Conectado a la base de datos");
    })
    .catch((err) => {
      console.error("Error de conexión:", err.message);
      process.exit(1);
    });
}

app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signin.html"));
});

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "profile.html"));
});

app.use("/api/users", userRouters);
app.use("/api/auth", authRouter);

app.listen(8000, () => {
  connect();
  console.log("Escuchando al puerto 8000");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Conexión a la base de datos cerrada");
    process.exit(0);
  });
});
