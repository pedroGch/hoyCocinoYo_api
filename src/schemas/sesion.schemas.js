import yup from 'yup'

const msj_password_requided  = 'el password de usuario es obligatorio'
const msj_email_requided  = 'el email de usuario es obligatorio'
const msj_email_email  = 'el email de usuario debe tener un formato permitido'

export const inicioSesionSchema = yup.object({

  email     : yup.string().required(msj_email_requided).email(msj_email_email),
  password  : yup.string().required(msj_password_requided),

})
