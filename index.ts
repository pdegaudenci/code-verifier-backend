
// Variables de entorno
import dotenv from 'dotenv'
import server from './src/server'
import { LogError, LogSucess } from './src/utils/logger'


// Configuracion de archivo .env
dotenv.config();

const port = process.env.PORT || 8000;

// Poner Servidor en escucha
server.listen(port, () => {
    LogSucess(`[SERVER ON] Corriendo en http://localhost:${port}/api`)
})

//Control de error de Servidor
server.on('error', (error) => {
    LogError(`[SERVER ERROR]: ${error}`);
})
