## Dependencias:
  #Dependencias globales:
    * Express: framwork para back end de node.js
    * dotenv: permite leer las variables de entorno del archivo .env que se encuentra en la raiz

  #Dependencias de desarrollo: 
    * nodemon: permite recargar la página cada vez que detecta un cambio en el editor sin necesidad de inicializar continuamente el proyecto. 
    * typescript @types/express @types/node : libreria necesarias para transpilacion, es decir, convertir codigo de typescript en javascript de forma automatica y trasnparente. Tambien se instalan dos librerias para que TypeScript  reconozca los tipos de las clases de Express.
    * concurrently : permite  combinar diferentes comandos de script en un único script y luego ejecutarlo en la línea de comandos
    * webpack webpack-cli webpack-node-externals webpack-shell-plugin :  empaquetador de módulos, es decir,  permite generar un archivo único con todos aquellos módulos que necesita la aplicación para funcionar
    * eslint:permite aplicar reglas de programacion y codigo limpio a un estilo de programacion 
    *  jest ts-jest @types/jest supertest  : librerias de testing unitario que permite escribir y ejecutar tests
    * ts-node: Par apoder TypeScript directamente en Node sin necesidad de transpilar.
    * serve : Permite servir a nivel web los informes de cobertura para su visualizacion grafica

## Scripts utilizados (package.json)--> Se ejecutan con npm run nombreScript :
    * "build": "npx tsc" : ejecutar el paquete instalado localmente tsc -> transpilar el codigo en index.js a un fichero javascript index.js en la carpeta dist
    * "start": "node dist/index.js", : Ejecuta el fichero index.js
    * "dev": "concurrently \"npx tsc --watch\" \" \"nodemon -q dist/index.js\" ", : Ejecuta dos scripts (gracias al paquete concurrentily) , el primer script trasnpilar el codido de typescript y que en la escucha (--watch), de cualquier modificacion que es guardada se trasnpila nuevamente de forma automatica. El segundo script ejecuta index.js y recarga el server automaticamente cada vez que detecta un cambio en el index.js (modificacion index.ts --> trasnpila automaticamente y modifica dis/index.js y se reinicia servidor)
    * "test": "jest", : ejecucion de test ubicados en la carpeta _tes_
    * "start:local": "npx nodemon index.js", : Ejecuta de forma local el archivo index.js con nodemon (proceso en segundo plano que detecta cambios salvados y actualiza automaticamente el server)
    * "serve:coverage": "npm run test && cd coverage/lcov-report &&  npx serve": Concatencian de los siguientes comandos --> Ejecuta script de test (ejecuta jest) - se mueve a la carpeta cd coverage/lcov-report && ejecuta localmente el paquete serve para generar reportes graficos, accesibles localmente desde el navegador con lat URL  http://localhost:3000   

  ## Variables de entorno en .env:
    * HOST: Establece en que direccion se ejecutara la aplicacion en node (Valor: Localhost)
    * PORT: Establece desde que puerto del server va a escuchar las peticiones nuestra app en Node (En este caso el puerto 8000)
