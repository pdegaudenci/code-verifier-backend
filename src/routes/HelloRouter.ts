import express, { Request, Response } from 'express'
import { HelloController } from '@/controller/HelloController'
import { LogInfo } from '@/utils/logger';

// Router de Express

let helloRouter = express.Router(); // Acceder al sistema de enrutado

// Defino todos los metodos http para esta ruta
// GET -> http://localhost:8000/api/hello?name=Pedro/ (funcion asincrono)
helloRouter.route('/') // Ruta raiz para esta ruta (hello/)
    .get(async (req: Request, res: Response) => {
        // Obtener query Param (consultas que son recibidas por parametro en la URL)
        let nombre: any = req?.query?.name;
        LogInfo(`Query Param : ${nombre}`);

        // Instancia de controlador
        const controller: HelloController = new HelloController();

        //Obtener respuesta
        //controller.getMessage().then
        const response = await controller.getMessage(nombre)


        // Enviar respuesta

        return res.send(response);



    })

// Export  (para toda la defincion de arriba)

export default helloRouter;