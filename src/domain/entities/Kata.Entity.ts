/* eslint-disable indent */
import mongoose from 'mongoose'

export const kataEntity = () => {
    const userSchema = new mongoose.Schema({
        name: String,
        Chances: Number,
        Date: Date,
        Description: String,
        Level: Number,
        User: {
            name: String,
            email: String,
            age: Number
        },
        Valorations: Number,
        Average: Number,
        ValorationQuantity: Number

    })

    return mongoose.models.katas || mongoose.model('katas', userSchema)
}
