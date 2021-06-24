import { Document } from "mongoose"

export interface ITodo extends Document {
    title: string
    description: string
    year: number
    isPublic: boolean
    isCompleted: boolean
}














// export interface ITodo extends Document {
//     title: string
//     description: string
//     year: number
//     isPublic: boolean
//     isCompleted: boolean
// }
