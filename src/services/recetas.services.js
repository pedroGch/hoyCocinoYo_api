import { MongoClient, ObjectId } from 'mongodb'


const cliente = new MongoClient('mongodb://127.0.0.1:27017')
const db = cliente.db("AH_PARCIAL2")
const recetaCollection = db.collection("recetas")

/**
 * Retorna todas las recetas de la base de datos
 * @returns []
 */
export async function todasLasRecetas() {
  await cliente.connect()
  return await recetaCollection.find().toArray()
}

/**
 * Retorna una receta según su id
 * @param {String} id 
 * @returns {}
 */
export async function recetaPorId(id) {
  await cliente.connect()
  return await recetaCollection.findOne({_id: new ObjectId(id)})
}

/**
 * 
 * @param {*} data 
 * @returns {}
 */
export async function crearReceta(data){
  await cliente.connect()
  return await recetaCollection.insertOne({...data})
}

/**
 * 
 * @param {*} id 
 * @param {Object} data 
 * @returns {}
 */
export async function editarReceta (id, data){
  await cliente.connect()
  return await recetaCollection.updateOne({_id: new ObjectId(id)}, { $set: {...data}})
}

/**
 * 
 * @param {*} id 
 * @returns {}
 */
export async function borrarReceta(id){
  await cliente.connect()
  return await recetaCollection.deleteOne({_id: new ObjectId(id)})
}
