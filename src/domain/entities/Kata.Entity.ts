/* eslint-disable indent */
import mongoose from 'mongoose'
import { IKata } from '../IKata.interface'

export const kataEntity = () => {
    const userSchema = new mongoose.Schema<IKata>({
        name: { type: String, required: true },
        Chances: { type: Number, required: true },
        Date: { type: Date, required: true },
        Description: { type: String, required: true },
        Level: { type: String, required: true },
        User: String,
        Valorations: Number,
        Average: Number,
        ValorationQuantity: Number,
        solution: { type: String, required: true },
        participants: { type: [], required: true },


    })

    return mongoose.models.katas || mongoose.model<IKata>('katas', userSchema)
}
