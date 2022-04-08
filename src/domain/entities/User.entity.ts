import mongoose from 'mongoose'

// Creacion de esquema de estructura de datos para tratar datos de usuario en la BD
// Los elementos de la colleccion Users siguen esta estructura
export const userEntity = () => {
    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        edad: Number
    })

    // retorna modelo asignado a la collecion users que cumplen el esquema
    return mongoose.model('users', userSchema)
}
