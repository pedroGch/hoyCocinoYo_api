import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
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
    const uniqueName = `${uuidv4()}.${file.originalname.split(".").pop()}`;
    cb(null, uniqueName);
    req.body.imagen_ruta = uniqueName;
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
