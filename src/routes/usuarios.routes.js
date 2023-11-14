import express from 'express'
import {checkAuth} from '../middlewares/auth.middlewares.js'
import {iniciarSesion,registrarUsuario,desloguear} from "../controllers/usuarios.controllers.js"

export const routerUsuarios = express()

routerUsuarios.post('/iniciar-sesion', iniciarSesion)
routerUsuarios.post('/registrar', registrarUsuario)
routerUsuarios.post('/desloguear ', desloguear) 



