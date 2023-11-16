import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'
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
  const hashedPassword = bcrypt.hashSync(data.password, parseInt(process.env.HASNUMBER))
  data.password = hashedPassword
  return await usuarioCollection.insertOne({_id: new ObjectId(), ...data})
}

export async function obtenerPorUsername (username){
  await cliente.connect()
  return await usuarioCollection.findOne({username: username})
}

export async function obtenerPorEmail (email){
  await cliente.connect()
  return await usuarioCollection.findOne({email: email})
}