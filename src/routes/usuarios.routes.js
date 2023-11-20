import express from 'express'
import {checkAuth} from '../middlewares/auth.middleware.js'
import {usuarioContrasenia} from '../middlewares/login.middlewares.js'
import {usernameExiste,emailExiste,valUsuariRegistro} from '../middlewares/usuarios.middlewares.js'
import {iniciarSesionUsuario,registrarUsuario,desloguear} from "../controllers/usuarios.controllers.js"

export const routerUsuarios = express()

//routerUsuarios.post('/iniciar-sesion', [usuarioContrasenia], iniciarSesionUsuario)
routerUsuarios.post('/iniciar-sesion', iniciarSesionUsuario)
routerUsuarios.post('/registrar',[valUsuariRegistro],[emailExiste], [usernameExiste], registrarUsuario)

routerUsuarios.post('/desloguear ', desloguear) 



