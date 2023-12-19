import express from 'express'
import {checkAuth} from '../middlewares/auth.middleware.js'
import {valInicioSesion} from '../middlewares/login.middlewares.js'
import {usernameExiste,emailExiste,valUsuariRegistro} from '../middlewares/usuarios.middlewares.js'
import {resetPassSchema,forgotPassSchema} from '../middlewares/resetPass.middleware.js'
import {iniciarSesionUsuario,registrarUsuario,desloguear, guardarReceta, quitarReceta} from "../controllers/usuarios.controllers.js"
import {recetasPorUsuario} from "../controllers/recetas.controllers.js"
import {forgotPassword} from '../controllers/forgotPassword.controllers.js'
import {resetPassword} from '../controllers/resetPassword.controllers.js'

export const routerUsuarios = express()

routerUsuarios.post('/iniciar-sesion', [valInicioSesion], iniciarSesionUsuario)

routerUsuarios.post('/registrar',[valUsuariRegistro],[emailExiste], [usernameExiste], registrarUsuario)

routerUsuarios.post('/cerrar-sesion',[checkAuth] ,desloguear) 

routerUsuarios.get('/:id/recetas', recetasPorUsuario)

routerUsuarios.post('/recuperar-password',[forgotPassSchema], forgotPassword)

routerUsuarios.post('/:id/:token/restituir-password',[resetPassSchema], resetPassword)

routerUsuarios.put('/:idUsuario/:idReceta', guardarReceta)

routerUsuarios.delete('/:idUsuario/:idReceta', quitarReceta)