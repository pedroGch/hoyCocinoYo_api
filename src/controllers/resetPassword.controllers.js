import jwt from 'jsonwebtoken'
import { editarPassword } from '../services/usuarios.services.js'

let regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/  //aca va el formato que debe tener la nueva contraseña


export async function resetPassword(req, res) {
  const id = req.params.id
  const token = req.params.token
  const pass = {'password': req.body.password}
  const payload = jwt.verify(token, process.env.SECRETKEY)
  if (id === "" || token === "" || !payload){
    res.status(500).json({message: `hay un probela con la RUL generada. Vuelva a generarla`})
  }
  // if(!regExPassword.test(req.body.password)){
  //   res.status(403).json({message: 'el password no concuerda con el formato deseado'})
  // }
  try {

    editarPassword(id, pass).
    then( respuesta => {
      console.log(respuesta);
      res.status(201).json({message: 'contraseña cambiada con éxito'})
    })

  } catch (error) {
    res.status(500).json({message: `error: ${error}`})
  }

}