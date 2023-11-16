import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import {
  crearUsuario, 
  obtenerPorUsername, 
  obtenerPorEmail
} from '../services/usuarios.services.js'

export  async function registrarUsuario (req, res) {
  const {username, password, lastName, firstName, email} = req.body
  
  
  
  const inserted = await crearUsuario(
    {
      userName:username, 
      password:password, 
      lastName, 
      firstName, 
      email
    }
  );
  
  const token = jwt.sign({id: inserted.id}, process.env.SECRETKEY, {expiresIn:86400})
  res.status(201).json({ token: token  })
}

export  async function iniciarSesion (req, res) {
  const usuario = await obtenerPorUsername(req.usuario)
  const passwordIsValid = bcrypt.compareSync( req.body.password, usuario.password)
  
  if (!usuario){
    res.status(404).send({message: 'Usuario o contraseña incorrecta'})
  }

  if (!passwordIsValid){
    res.status(401).send({message: 'Datos incorrectos '})
  }
  
  const token = jwt.sign({id: usuario.id}, process.env.SECRETKEY, {expiresIn:86400})
  
  res.status(200).send({ 
    id: usuario.id ,
    username: usuario.userName,
    token: token 
  })
}

export  async function desloguear (req, res) {
}

export async function nombreDeUsuarioExiste (nombreDeUsuario) {
  return await obtenerPorUsername(nombreDeUsuario)


} 

export async function emailUsuarioExiste (emailUsuario) {
  return await obtenerPorEmail(emailUsuario)
}