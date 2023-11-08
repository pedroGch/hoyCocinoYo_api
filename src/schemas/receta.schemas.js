import yup from 'yup'

const msj_nombre_requided  = 'el nombre es obligatorio'

export const recetaCrearSchema = yup.object({

  nombre  : yup.string().required(msj_nombre_requided),

})
