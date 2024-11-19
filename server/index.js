import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRouters from "./routes/users.js";

const app = express();
dotenv.config();

const connect = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch((err) => {
        throw err;
    });
};

app.use("/api/users", userRouters);

app.listen(8000, () => {
    connect();
    console.log("Escuchando al puerto 8000");
});