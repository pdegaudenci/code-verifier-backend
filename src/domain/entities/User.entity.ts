import mongoose from 'mongoose'

// Creacion de esquema de estructura de datos para tratar datos de usuario en la BD
// Los elementos de la colleccion Users siguen esta estructura
export const userEntity = () => {
    // En el esquema no introduzco id, porque mongodb lo crea 
    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        age: Number
    })

    // retorna modelo asignado a la collecion users que cumplen el esquema si es la primera vez que se ejecuta o retorno el modelo existente
    return mongoose.models.users || mongoose.model('users', userSchema)
}
