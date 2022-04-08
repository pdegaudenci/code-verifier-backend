import express, { Express, Response, Request } from 'express';


// Seguridad
import cors from 'cors'
import helmet from 'helmet'

// TODO HTTPS

// Root router (importa index.ts)

import routes from '../routes'


// Crear Express APP
const app: Express = express() // Devuelve instancia de express
const port: string | number = process.env.PORT || 8000 // variable 8000 debe estar dispinible en archivo .env

// Definir la direccion de entrada del SERVER "/api" y ejecute rootRouter del index.ts de carpeta routes
app.use('/api', routes) // http:// localhost:8000/api/....

// static server
app.use(express.static('/public'));


// TODO Mongoose connection

// Security config
app.use(cors());
app.use(helmet());

// Tipo de contenido o restricicones  tiene que mostrar la app o server --> Content-Type
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))// PEticiones y respuestas son en formato JSON


// Redireccion de http://localhost:8000/ --> http://localhost:8000/api
app.get('/', (req: Request, res: Response) => {
    res.redirect('/api')
})

export default app;
