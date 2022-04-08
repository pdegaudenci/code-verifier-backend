/* eslint-disable prefer-const */
import express, { Request, Response } from 'express'
import helloRouter from './HelloRouter'
import { LogInfo } from '../utils/logger'
import GoodByeRouter from '../routes/GoodByeRouter'


// Server instance

const server = express()

// router instance
let rootRouter = express.Router()

// Se gestionaran las rutas dirigidas a http://localhost:8000/api (Esto se definira en la cofiguracion del server)

rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8000/api')
    res.send('APP Express +TS +swagger + Mongoose')
})

// definir redirecciones a rutas & controladores --> Se añaden todas las rutas y las redirecciones
server.use('/', rootRouter)
server.use('/hello', helloRouter) // http://localhost:8000/api/hello --> gestionadas por helloRouter
server.use('/goodbye', GoodByeRouter)


export default server
