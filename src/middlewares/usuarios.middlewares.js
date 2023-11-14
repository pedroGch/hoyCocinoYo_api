import {nombreDeUsuarioExiste,emailUsuarioExiste} from "../controllers/usuarios.controllers.js"

export function nombreExiste(req, res, next) {
  nombreDeUsuarioExiste(req.body.password) ? 
    res.status(400).send({message:"Este nombre de usuario ya existe"}) :
    next()
}

export function emailExiste(req, res, next) {
  emailUsuarioExiste(req.body.usuario) ? 
  res.status(400).send({message:"El email ya esta registrado"}) :
  next()
}