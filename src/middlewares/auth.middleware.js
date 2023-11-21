import {verificarToken} from '../services/usuarios.services.js'

export  function checkAuth  (req, res, next){
  const token = req.headers['x-acces-token']

  if(!token){
    res.status(404).json({'message': 'No se registra token'})
  }
  else{
    verificarToken(token)
      .then((payload) =>{
        req.session = payload
        next()
      })
      .catch (err => {
        res.status(500).json(err)
      }) 
  } 
}
