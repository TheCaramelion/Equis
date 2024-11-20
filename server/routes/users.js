import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send("Ruta 'users' haciendo una peticion GET.")
});

export default router;