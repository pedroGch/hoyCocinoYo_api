import yup from 'yup'

const msj_nombre_requided  = 'el nombre de la receta es obligatorio'
const msj_preparacion_requided  = 'la preparacion de la receta es obligatoria'
const msj_ingredientes_requided  = 'los ingredientes son requeridos'
const msj_categoria_requided  = 'la categoria de la receta es obligatori'
const msj_min_array = 'una receta no puede tener menos de 3 ingredientes'
 

export const recetaCrearSchema = yup.object({

  nombre  : yup.string().required(msj_nombre_requided),
  categoria : yup.string().required(msj_categoria_requided),
  ingredientes : yup.array().required(msj_ingredientes_requided),
  preparacion : yup.string().required(msj_preparacion_requided)
})
