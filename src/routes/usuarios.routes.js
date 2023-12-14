import express from 'express'
import {checkAuth} from '../middlewares/auth.middleware.js'
import {valInicioSesion} from '../middlewares/login.middlewares.js'
import {usernameExiste,emailExiste,valUsuariRegistro} from '../middlewares/usuarios.middlewares.js'
import {iniciarSesionUsuario,registrarUsuario,desloguear} from "../controllers/usuarios.controllers.js"
import {recetasPorUsuario} from "../controllers/recetas.controllers.js"
import {forgotPassword} from '../controllers/forgotPassword.controllers.js'
import {resetPassword} from '../controllers/resetPassword.controllers.js'

export const routerUsuarios = express()

routerUsuarios.post('/iniciar-sesion', [valInicioSesion], iniciarSesionUsuario)

routerUsuarios.post('/registrar',[valUsuariRegistro],[emailExiste], [usernameExiste], registrarUsuario)

routerUsuarios.post('/cerrar-sesion',[checkAuth] ,desloguear) 

routerUsuarios.get('/:id/recetas', recetasPorUsuario)

routerUsuarios.get('/recuperar-password', forgotPassword)

routerUsuarios.post('/restituir-password/:id/:token', resetPassword)

