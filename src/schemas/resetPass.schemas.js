import yup from 'yup'

const msj_password_requided  = 'el nuevo password del usuario es obligatorio'




export const passwordValidate = yup.object({
  password: yup.string().required(msj_password_requided),
})