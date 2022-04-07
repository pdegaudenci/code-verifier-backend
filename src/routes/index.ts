import express, { Request, response } from 'express'
import helloRouter from './HelloRouter'
import { LogInfo } from '@/utils/logger'
import { HelloController } from '@/controller/HelloController';

// Server instance
let server = express();

// router instance 
let rootRouter = express.Router();

// Se gestionaran las rutas dirigidas a http://localhost:8000/api (Esto se definira en la cofiguracion del server)

rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8000/api')
    res.send('APP Express +TS +swagger + Mongoose')
})

// definir redirecciones a rutas & controladores --> Se añaden todas las rutas y las redirecciones
server.use('/', rootRouter);
server.use('/hello', helloRouter); // http://localhost:8000/api/hello --> gestionadas por helloRouter

export default server;
