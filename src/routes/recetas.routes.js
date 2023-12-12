import express from 'express'
import {valRecetaCrear} from '../middlewares/receta.middlewares.js'
import {checkAuth} from '../middlewares/auth.middleware.js'
import {recetas, recetaId, nuevaReceta, editar, borrar} from "../controllers/recetas.controllers.js"

export const routerRecetas = express()

//retorna todas las recetas
routerRecetas.get('/todas', recetas)

//crea una receta
routerRecetas.post('/',[checkAuth],[valRecetaCrear], nuevaReceta)

//devuelve una receta en base a su id
routerRecetas.get('/:id', recetaId)

//editar una receta
routerRecetas.put('/:id',[checkAuth] ,editar)

//borrar una receta
routerRecetas.delete('/:id',[checkAuth] ,borrar)


