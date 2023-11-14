import bcrypt from 'bcryptjs'
import {crearUsuario} from '../services/usuarios.services.js'

export  async function registrarUsuario (req, res) {
  const {username, password, lastName, firstName, email} = req.body
  
  const hashedPassword = bcrypt.hashSync(password, parseInt(HASH_NUMBER))
  const inserted = await crearUsuario({userName:username, password:hashedPassword, lastName, firstName, email});
  const token = jwt.sign({id: inserted.id}, 'mySecretKey', {expiresIn:86400})
  return res.status(201).json({ token: token  })
}

export  async function iniciarSesion (req, res) {
}

export  async function desloguear (req, res) {
}

export async function nombreDeUsuarioExiste (nombreDeUsuario) {
  return false;
} 

export async function emailUsuarioExiste (emailUsuario) {
  return false;
}