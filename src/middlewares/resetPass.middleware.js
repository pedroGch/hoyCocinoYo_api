import {passwordValidate} from "../schemas/resetPass.schemas.js"
import {emailValidate} from "../schemas/forgotPass.schemas.js"

export function resetPassSchema(req, res, next){
  passwordValidate.validate(req.body,{
    stripUnknown: true,
    abortEarly: false
  })
  .then(async function (usuario) {
    next()
  })
  .catch(function (err) {
    res.status(400).json(err.errors)
  })
}

export function forgotPassSchema(req, res, next){
  emailValidate.validate(req.body,{
    stripUnknown: true,
    abortEarly: false
  })
  .then(async function (usuario) {
    next()
  })
  .catch(function (err) {
    res.status(400).json(err.errors)
  })
}