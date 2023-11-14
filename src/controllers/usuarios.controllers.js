import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import {crearUsuario, obtenerUsuario, obtenerPorUsername, obtenerPorEmail} from '../services/usuarios.services.js'

export  async function registrarUsuario (req, res) {
  const {username, password, lastName, firstName, email} = req.body
  
  const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.HASNUMBER))
  
  const inserted = await crearUsuario(
    {
      userName:username, 
      password:hashedPassword, 
      lastName, 
      firstName, 
      email
    }
  );
  
  const token = jwt.sign({id: inserted.id}, process.env.SECRETKEY, {expiresIn:86400})
  return res.status(201).json({ token: token  })
}

export  async function iniciarSesion (req, res) {
  const usuario = await obtenerUsuario(req.body)

}

export  async function desloguear (req, res) {
}

export async function nombreDeUsuarioExiste (nombreDeUsuario) {
  return await obtenerPorUsername(nombreDeUsuario)


} 

export async function emailUsuarioExiste (emailUsuario) {
  return await obtenerPorEmail(emailUsuario)
}