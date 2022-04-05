import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// Configuracion de archivo .env
dotenv.config();

//Crear Express APP
const app: Express = express(); // Devuelve instancia de express 
const port: string | number = process.env.PORT || 8000; // variable 8000 debe estar dispinible en archivo .env


// Define primera ruta de app o ruta raiz
//get(ruta, funcion que se ejecuta cuando se accede a esa ruta)

app.get('/', (req: Request, res: Response) => {
    res.send('APP Express +TS +swagger + Mongoose')
});

app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello')
});

// Ejecutar app y escuchar en un puerto concreto
app.listen(port, () => {
    console.log(`SERVIDOR EXPRESS corriendo en  http://localhost:${port}`)
})