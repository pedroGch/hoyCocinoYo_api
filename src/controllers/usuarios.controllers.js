import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import {
  crearUsuario, 
  obtenerPorUsername, 
  obtenerPorEmail,
  eliminarSesion,
  iniciarSesion
} from '../services/usuarios.services.js'

export  async function registrarUsuario (req, res) {
  const {username, password, email} = req.body
  const inserted = await crearUsuario({
    username:username, 
    password:password, 
    email
  });
  if (inserted.password == undefined){
    res.status(201).json(inserted)
  }else{
    res.status(400).send('no se pudo crear el nuevo usuario')
  }

}

export  async function iniciarSesionUsuario (req, res) {

  iniciarSesion(req.body)
    .then(usuario =>{
      res.status(200).json(usuario)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
}

export  async function desloguear (req, res) {
  eliminarSesion(req.headers['x-acces-token'])
  .then(respuesta =>{

    res.status(200).json(respuesta)
  })
  .catch(err =>{
    res.status(500).json(err)
  })
}


export async function nombreDeUsuarioExiste (nombreDeUsuario) {
  return await obtenerPorUsername(nombreDeUsuario)


} 

export async function emailUsuarioExiste (emailUsuario) {
  return await obtenerPorEmail(emailUsuario)
}