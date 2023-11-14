import jwt from 'jsonwebtoken'

export  function checkAuth  (req, res, next){
  const token = req.headers['x-acces-token']

  if(!token){
    res.send(401).json({'message': 'No se registra token'})
  }else{
    try {
      jwt.verify(token, "mySecretKey", (err, decoded) =>{
        if (err){
          res.send(401).json({'message': 'Token invalido'})
        }
        //en la variable decoded tenemos los datos decodificados, esto puede no ir
        req.user_id = decoded.id
        console.log (decoded.id)
        //-----------------------
        next();
      })
    } catch (error) {
      res.status(500).send('Error en el sevidor')
    }
  }
}