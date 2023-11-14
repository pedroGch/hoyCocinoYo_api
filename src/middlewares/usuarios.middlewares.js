import {nombreDeUsuarioExiste,emailUsuarioExiste} from "../controllers/usuarios.controllers.js"
import {usuarioRegistroSchema} from "../schemas/usuario.schemas.js"

export async function usernameExiste(req, res, next) {
  const usuario =  await nombreDeUsuarioExiste(req.body.username)
  usuario ?   res.status(400).send({message:"El username ya esta registrado"}) : next()
}

export async function emailExiste(req, res, next) {

  const usuario =  await emailUsuarioExiste(req.body.email)
  usuario ?   res.status(400).send({message:"El email ya esta registrado"}) : next()
}

export function valUsuariRegistro(req, res, next){
  usuarioRegistroSchema.validate(req.body,{
    stripUnknown: true,
    abortEarly: false
  })
  .then(async function (usuario) {

    req.body = usuario
    next()
  })
  .catch(function (err) {
    res.status(400).json(err.errors)
  })
}