import express from "express";
import multer from "multer";
import { valRecetaCrear } from "../middlewares/receta.middlewares.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
import {
  recetas,
  recetaId,
  nuevaReceta,
  editar,
  borrar,
} from "../controllers/recetas.controllers.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

export const routerRecetas = express();

//retorna todas las recetas
routerRecetas.get("/todas", recetas);

//crea una receta
routerRecetas.post(
  "/",
  [checkAuth],
  upload.single("imagen"),
  [valRecetaCrear],
  nuevaReceta
);

//devuelve una receta en base a su id
routerRecetas.get("/:id", recetaId);

//editar una receta
routerRecetas.put("/:id", [checkAuth], editar);

//borrar una receta
routerRecetas.delete("/:id", [checkAuth], borrar);
