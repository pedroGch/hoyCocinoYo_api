export function usuarioContrasenia (req, res, next){
  if (!req.body.username || !req.body.password){
    res.status(400).send({message:"Datos incompletos"})
  }
  next()
}
