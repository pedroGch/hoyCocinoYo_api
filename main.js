import express from 'express'
import { routerApi } from './src/routes/index.routes.js'
import cors from 'cors'

const app = express()
const port = 2221

app.use(cors())
app.use(express.json())

routerApi(app)

app.listen(port, () => {
  console.log(`estas conectado al puerto: ${port}`)
})