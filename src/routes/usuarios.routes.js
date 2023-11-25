import express from 'express'
import {checkAuth} from '../middlewares/auth.middleware.js'
import {valInicioSesion} from '../middlewares/login.middlewares.js'
import {usernameExiste,emailExiste,valUsuariRegistro} from '../middlewares/usuarios.middlewares.js'
import {iniciarSesionUsuario,registrarUsuario,desloguear} from "../controllers/usuarios.controllers.js"

export const routerUsuarios = express()

routerUsuarios.post('/iniciar-sesion', [valInicioSesion], iniciarSesionUsuario)
routerUsuarios.post('/registrar',[valUsuariRegistro],[emailExiste], [usernameExiste], registrarUsuario)

routerUsuarios.post('/cerrar-sesion',[checkAuth] ,desloguear) 



