import yup from 'yup'

const msj_requided  = 'este es obligatorio'
const msj_min_array = 'una receta no puede tener menos de 3 ingredientes'
 

export const recetaCrearSchema = yup.object({

  nombre  : yup.string().required(msj_requided),
  categoria : yup.string().required(msj_requided),
  ingredientes : yup.array().min(3, msj_min_array).required(msj_requided),
  preparacion : yup.string().required(msj_requided)
})
