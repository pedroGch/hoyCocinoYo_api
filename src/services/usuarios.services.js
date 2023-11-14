import { MongoClient, ObjectId } from 'mongodb'
import 'dotenv/config'

const cliente = new MongoClient( process.env.MONGO_DB_URL)
const db = cliente.db(process.env.DB_NAME)
const usuarioCollection = db.collection(process.env.USUARIO_COLLECTION)


/**
 * 
 * @param {*} data 
 * @returns {}
 */
export async function crearUsuario(data){
  await cliente.connect()
  return await usuarioCollection.insertOne({_id: new ObjectId(), ...data})
}

/**
 * 
 * @param {*} user 
 * @returns {}
 */
export async function obtenerUsuario (user){
  await cliente.connect()
  return await usuarioCollection.findOne({username: user.username, password: user.password})
}


export async function obtenerPorUsername (username){
  await cliente.connect()
  return await usuarioCollection.findOne({userName: username})
}

export async function obtenerPorEmail (email){
  await cliente.connect()
  return await usuarioCollection.findOne({email: email})
}