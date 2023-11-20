import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import {
  crearUsuario, 
  obtenerPorUsername, 
  obtenerPorEmail,
  iniciarSesion
} from '../services/usuarios.services.js'

export  async function registrarUsuario (req, res) {
  const {username, password, lastName, firstName, email} = req.body
  const inserted = await crearUsuario({
    username:username, 
    password:password, 
    lastName, 
    firstName, 
    email
  });
  if (inserted.password == undefined){
    res.status(201).json(inserted)
  }else{
    res.status(400).send('no se pudo crear el nuevo usuario')
  }

}

export  async function iniciarSesionUsuario (req, res) {
  console.log(req.body);
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
    console.log(respuesta)
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