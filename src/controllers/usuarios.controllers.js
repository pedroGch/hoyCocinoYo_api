import bcrypt from 'bcryptjs'
import {crearUsuario} from '../services/usuarios.services.js'

export  async function registrarUsuario (req, res) {
  const {username, password, lastName, firstName, email} = req.body
  // if (!username || !password){
  //   res.status(401).send({message:"Datos incompletos"})
  // }
  
  // const checkExist = await model.User.count({where: {userName: username}})
  
  // if (checkExist > 0){
  //   return res.status(401).send({message:"Este usuario ya existe"})
  // }
  const hashedPassword = bcrypt.hashSync(password, parseInt(HASH_NUMBER))
  const inserted = await crearUsuario({userName:username, password:hashedPassword, lastName, firstName, email});
  const token = jwt.sign({id: inserted.id}, 'mySecretKey', {expiresIn:86400})
  return res.status(201).json({ token: token  })
}

export  async function iniciarSesion (req, res) {
}

export  async function desloguear (req, res) {
}

