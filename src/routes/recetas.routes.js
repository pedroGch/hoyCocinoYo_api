import express from 'express'
import {valRecetaCrear} from '../middlewares/receta.middlewares.js'
import {checkAuth} from '../middlewares/auth.middleware.js'
import {recetas, recetaId, nuevaReceta, editar, borrar} from "../controllers/recetas.controllers.js"

export const routerRecetas = express()

routerRecetas.get('/todas', recetas)
routerRecetas.get('/:id', recetaId)
routerRecetas.post('/crear',[checkAuth],[valRecetaCrear], nuevaReceta)
routerRecetas.put('/:id/editar',[checkAuth] ,editar)
routerRecetas.delete('/:id/borrar',[checkAuth] ,borrar)
routerRecetas.get('/:id/borrar',[checkAuth] ,borrar)

