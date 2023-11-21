import {todasLasRecetas, recetaPorId, crearReceta, editarReceta, borrarReceta} from "../services/recetas.services.js"


export function recetas(req, res) {
  todasLasRecetas()
    .then( recetas => {
      console.log(recetas);
      res.status(200).json(recetas)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
}


export async function recetaId(req, res) {
  recetaPorId(req.params.id)
  .then( receta => {
    res.status(200).json(receta)
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
}


export async function nuevaReceta(req, res){
  crearReceta(req.body)
  .then( receta => {
    res.status(200).json(receta)
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
}


export async function editar (req, res){
  editarReceta(req.params.id, req.body)
  .then(respuesta => {
    res.status(200).json(respuesta)
  })
  .catch( error => {
    res.status(500).json(error.message)
  })
}


export async function borrar(req, res){
  borrarReceta(req.params.id)
  .then( (respuesta) => {
    if (respuesta) {
      res.status(200).json(respuesta)
    }else{
      res.status(404).send('no se pudo eliminar, receta no encontrada')
    }
  })
  .catch((error) => {
    res.status(500).send('error: ' + error)
  })
  
}