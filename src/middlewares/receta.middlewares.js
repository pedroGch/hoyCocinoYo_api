import {recetaCrearSchema} from "../schemas/receta.schemas.js"

export function valRecetaCrear(req, res, next){
  recetaCrearSchema.validate(req.body,{
    stripUnknown: true,
    abortEarly: false
  })
  .then(async function (receta) {

    req.body = receta
    next()
  })
  .catch(function (err) {
    res.status(400).json(err)
  })
}