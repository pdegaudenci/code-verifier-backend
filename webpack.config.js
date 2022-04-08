/* eslint-disable indent */

const path = require('path') // para trabajar con rutas virtuales de los archivos dentro de nuestro proyecto
const nodeExternals = require('webpack-node-externals') // Para realizar correctamente la trasnpilacion

// exportar las configuraciones de webpack
module.exports = {
    mode: 'development',
    entry: {
        index: './index.ts'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }

        ]
    },
    resolve: {
        extensions: [
            '.tsx', '.ts', ',js'
        ]
    },
    externals: [nodeExternals()]

}
