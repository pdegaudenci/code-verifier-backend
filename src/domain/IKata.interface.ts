export enum KataLevel {
    BASIC = "BASIC",
    MEDIUM = "MEDIUM",
    HIGHT = "HIGHT"

}

export interface IKata {
    name: String,
    Chances: Number,
    Date: Number,
    Description: String,
    Level: KataLevel,
    User: String,
    Valorations: Number,
    Average: Number,
    ValorationQuantity: Number,
    solution: string,
    participants: string[]
}
