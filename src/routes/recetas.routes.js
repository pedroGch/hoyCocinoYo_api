import express from 'express'
import {recetas, recetaId, nuevaReceta, editar, borrar} from "../controllers/recetas.controllers.js"

export const routerRecetas = express()

routerRecetas.get('/:id', recetas)
routerRecetas.get('/todasLasRecetas', recetaId)
routerRecetas.post('/crear', nuevaReceta)
routerRecetas.put('/:id/editar', editar)
routerRecetas.delete('/:id/borrar', borrar)

