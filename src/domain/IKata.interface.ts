export interface IKata {
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
}