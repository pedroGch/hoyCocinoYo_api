import { MongoClient, ObjectId } from 'mongodb'
import 'dotenv/config'
import multer from 'multer'

const cliente = new MongoClient( process.env.MONGO_DB_URL_PROD)
const db = cliente.db(process.env.DB_NAME)
const recetaCollection = db.collection(process.env.RECETA_COLLECTION)

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'content/img')
  },
  filename: function(req, file, cb) {
    cb(null, req.params.id + ".jpg");
  }
})

const upload = multer({storage: storage});

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
 * Muestra todas las recetas de un usuario
 * @param {*} id 
 * @returns 
 */
export async function recetasPorUsuarioServicio(id) {
  await cliente.connect()
  return await recetaCollection.find({id_usuario: id}).toArray()
}

/**
 * Crea una receta
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
