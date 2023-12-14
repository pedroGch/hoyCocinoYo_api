import yup from 'yup'

const msj_email_requided  = 'el email es obligatorio'


export const emailValidate = yup.object({
  email: yup.string().required(msj_email_requided),
})