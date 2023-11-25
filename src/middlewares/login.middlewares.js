import {inicioSesionSchema} from "../schemas/sesion.schemas.js"

export function valInicioSesion(req, res, next){

  inicioSesionSchema.validate(req.body,{
    stripUnknown: true,
    abortEarly: false
  })
  .then(async function (sesion) {
    next()
  })
  .catch(function (err) {
    res.status(400).json(err)
  })
}