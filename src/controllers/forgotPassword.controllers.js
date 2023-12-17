import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { obtenerPorEmail, editarUsuario } from '../services/usuarios.services.js'
import 'dotenv/config'

export async function forgotPassword (req, res) {
  const email =  req.body.email;
  const usuario = await obtenerPorEmail(email)


  if (!usuario){
    res.status(403).send('este email no existe')
  }

  const token = jwt.sign({id: usuario._id}, process.env.SECRETKEY, {expiresIn: 3600})
  
  editarUsuario(usuario._id, {token_reset: token})

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    }
  })

  const emailPort = process.env.PORT || 3000

  const mailOptions  = {
    from: 'un email',
    to: `${usuario.email}`,
    subject: 'recuperar contraseña',
    text: `http://127.0.0.1:${emailPort}/api/v1/usuarios/restituirPassword/${usuario._id}/${token}`
  }

  transporter.sendMail(mailOptions, (err, response) => {
    if (err){
      console.log('Ha ocurrido: ', err);
    }
    else{
      console.log('respuesta: ', response );
      res.status(200).json('El email para la recuperacion ha sido enviado')
    }
  })

}

