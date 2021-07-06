import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param title:string
 * @param description:string
 * @param year:number
 * @param isPublic:boolean
 * @param isCompleted:boolean
 */
export interface ITodo extends Document {
    title: string;
    description: string;
    year: number;
    isPublic:boolean;
    isCompleted:boolean;
}

const todoSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    }
});

const Todo: Model<ITodo> = model("Todo", todoSchema);

export default Todo;
