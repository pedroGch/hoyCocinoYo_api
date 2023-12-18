import {
  todasLasRecetas,
  recetaPorId,
  crearReceta,
  editarReceta,
  borrarReceta,
  recetasPorUsuarioServicio,
} from "../services/recetas.services.js";

export function recetas(req, res) {
  todasLasRecetas()
    .then((recetas) => {
      res.status(200).json(recetas);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

export async function recetaId(req, res) {
  recetaPorId(req.params.id)
    .then((receta) => {
      res.status(200).json(receta);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

export async function recetasPorUsuario(req, res) {
  recetasPorUsuarioServicio(req.params.id)
    .then((recetas) => {
      res.status(200).json(recetas);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

export async function nuevaReceta(req, res) {
  try {
    let imagen_ruta = "receta-predeterminada.jpg";

    if (req.body.imagen_ruta) {
      imagen_ruta = req.body.imagen_ruta;
    }

    const nuevaRecetaCreada = await crearReceta({
      ...req.body,
      imagen_ruta,
      alt: 'Receta de ' + req.body.nombre,
    });

    res.status(200).json(nuevaRecetaCreada);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function editar(req, res) {
  editarReceta(req.params.id, req.body)
    .then((respuesta) => {
      res.status(200).json(respuesta);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
}

export async function borrar(req, res) {
  borrarReceta(req.params.id)
    .then((respuesta) => {
      if (respuesta) {
        res.status(200).json(respuesta);
      } else {
        res.status(404).send("no se pudo eliminar, receta no encontrada");
      }
    })
    .catch((error) => {
      res.status(500).send("error: " + error);
    });
}
