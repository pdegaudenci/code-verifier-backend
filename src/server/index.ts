import express, { Express, Response, Request, } from 'express'


// Swagger

import swaggerUI from 'swagger-ui-express'

// Seguridad
import cors from 'cors'
import helmet from 'helmet'

// TODO HTTPS

// Root router (importa index.ts)

import routes from '../routes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

// Crear Express APP
const server: Express = express() // Devuelve instancia de express
const port: string | number = process.env.PORT || 8000 // variable 8000 debe estar dispinible en archivo .env

//  swagger config y routes
server.use('/docs',
    swaggerUI.serve,
    swaggerUI.setup(undefined, {
        swaggerOptions: {
            url: '/swagger.json',
            explorer: true

        }
    })
)

// Definir la direccion de entrada del SERVER "/api" y ejecute rootRouter del index.ts de carpeta routes
server.use('/api', routes) // http:// localhost:8000/api/....

// static server
server.use(express.static('/public'))

// TODO Mongoose connection
mongoose.connect('mongodb://localhost:27017/codeVerification')

// Security config
server.use(cors())
server.use(helmet())

// Tipo de contenido o restricicones  tiene que mostrar la app o server --> Content-Type
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))// PEticiones y respuestas son en formato JSON

// Redireccion de http://localhost:8000/ --> http://localhost:8000/api
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api')
})

export default server
