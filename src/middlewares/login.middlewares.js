

export function usuarioContrasenia (req, res, next){
  const {usuario, password} = req.body

  if (!usuario || !password){
    res.status(400).send({message:"Datos incompletos"})
  }
  next()
}
