const express = require('express');
const dotenv = require('dotenv');

// Configuracion de archivo .env
dotenv.config();

//Crear Express APP
const app = express(); // Devuelve instancia de express 
const port = process.env.PORT || 8000; // variable 8000 debe estar dispinible en archivo .env


// Define primera ruta de app o ruta raiz
//get(ruta, funcion que se ejecuta cuando se accede a esa ruta)
app.get('/', (request, response) => {
    response.send('APP Express +TS +swagger + Mongoose')
}); // localhost:80000/


// Ejecutar app y escuchar en un puerto concreto
app.listen(port, () => {
    console.log(`SERVIDOR EXPRESS corriendo en  http://localhost:${port}`)
})

