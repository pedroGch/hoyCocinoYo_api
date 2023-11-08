import express from 'express'
import {valRecetaCrear} from '../middlewares/receta.middlewares.js'
import {recetas, recetaId, nuevaReceta, editar, borrar} from "../controllers/recetas.controllers.js"

export const routerRecetas = express()

routerRecetas.get('/:id', recetas)
routerRecetas.get('/todasLasRecetas', recetaId)
routerRecetas.post('/crear',[valRecetaCrear], nuevaReceta)
routerRecetas.put('/:id/editar', editar)
routerRecetas.delete('/:id/borrar', borrar)

