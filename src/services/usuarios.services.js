import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const cliente = new MongoClient( process.env.MONGO_DB_URL_PROD)
const db = cliente.db(process.env.DB_NAME)
const usuarioCollection = db.collection(process.env.USUARIO_COLLECTION)
const tokenCollection = db.collection(process.env.TOKEN_COLLECTION)


/**
 * 
 * @param {*} data 
 * @returns {}
 */
export async function crearUsuario(data){
  await cliente.connect()
  const hashedPassword = bcrypt.hashSync(data.password, parseInt(process.env.HASNUMBER))
  data.password = hashedPassword
  const usuarioNuevo =  await usuarioCollection.insertOne({_id: new ObjectId(), ...data})
  return {...usuarioNuevo, password: undefined}
}

/**
 * 
 * @param {*} username 
 * @returns {}
 */
export async function obtenerPorUsername (username){
  await cliente.connect()
  return await usuarioCollection.findOne({username: username})
}

/**
 * 
 * @param {*} email 
 * @returns {}
 */
export async function obtenerPorEmail (email){
  await cliente.connect()
  return await usuarioCollection.findOne({email: email})
}

/**
 * 
 * @param {*} data 
 * @returns {}
 */
export async function iniciarSesion(data) {
  const usuario = await verificarCuenta(data)
  const token = await crearToken({...data, password: undefined})

  return {
    ...usuario,
    token: token
  }
}

/**
 * 
 * @param {*} token 
 * @returns 
 */
export async function verificarToken(token) {
  await cliente.connect()
  const payload = jwt.verify(token, process.env.SECRETKEY)
  const eliminado = await tokenCollection.findOne({ token: token })
  if (eliminado == null){
    throw {msg: 'este token no es valido'}
  }
  return payload
}

/**
 * 
 * @param {*} cuenta 
 * @returns {}
 */
export async function verificarCuenta(cuenta){
  await cliente.connect()
  let cuentaExiste = await obtenerPorEmail(cuenta.email)

  if (!cuentaExiste){
    throw {msg:'usuario o contraseña incorrecto'}
  }

  if (!bcrypt.compareSync( cuenta.password, cuentaExiste.password)){
    throw {msg:'usuario o contraseña incorrecto'}
  }
  return {...cuentaExiste, password: undefined}
}

/**
 * 
 * @param {*} cuenta 
 * @returns String
 */
async function crearToken(cuenta) {
  await cliente.connect()
  const token = jwt.sign(cuenta, process.env.SECRETKEY, {expiresIn:86400})
  tokenCollection.insertOne({token, username: cuenta.username})
  return token

}

/**
 * 
 * @param {*} token 
 */
export async function eliminarSesion(token){

  await cliente.connect()
  return await tokenCollection.deleteOne({token: token})
}

/**
 * 
 * 
 */
export async function editarUsuario(id, data){
  await cliente.connect()
  return await usuarioCollection.updateOne({_id: new ObjectId(id)}, { $set: {...data}})
}

/**
 * 
 * 
 */
export async function editarPassword(id, data){
  await cliente.connect()
  const hashedPassword = bcrypt.hashSync(data.password, parseInt(process.env.HASNUMBER))
  data.password = hashedPassword
  return await usuarioCollection.updateOne({_id: new ObjectId(id)}, { $set: {...data}})
}

export async function almacenarReceta(idUser, data) {
  await cliente.connect()
  return await usuarioCollection.updateOne({_id: new ObjectId(idUser)}, {$push: {mis_recetas : data}})
}

export async function eliminarReceta(idUser, idReceta) {
  await cliente.connect()
  const usuario = await usuarioCollection.findOne({_id: new ObjectId(idUser)})  
  const nuevoArrRecetas = usuario.mis_recetas.filter(receta => receta.id_receta !== idReceta);
  const respuesta = await usuarioCollection.updateOne({_id: new ObjectId(idUser)}, { $set: {mis_recetas: nuevoArrRecetas}})
  return respuesta
}


export async function favoritos(idUser) {
  await cliente.connect()
  return await usuarioCollection.findOne({_id: new ObjectId(idUser)})
}