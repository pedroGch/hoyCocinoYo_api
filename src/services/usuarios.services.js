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
  return await usuarioCollection.insertOne({...data})
}

