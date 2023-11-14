import express from 'express'
import {checkAuth} from '../middlewares/auth.middleware.js'
import {usuarioContrasenia} from '../middlewares/login.middlewares.js'
import {nombreExiste,emailExiste} from '../middlewares/usuarios.middlewares.js'
import {iniciarSesion,registrarUsuario,desloguear} from "../controllers/usuarios.controllers.js"

export const routerUsuarios = express()

routerUsuarios.post('/iniciar-sesion', [usuarioContrasenia], iniciarSesion)
routerUsuarios.post('/registrar', [emailExiste], [nombreExiste], registrarUsuario)
routerUsuarios.post('/desloguear ', desloguear) 



