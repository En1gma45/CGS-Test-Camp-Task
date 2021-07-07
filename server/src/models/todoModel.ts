import { ITodo } from "./../types/todoTypes"
import { model, Schema } from "mongoose";

const todoSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String
        },

        year: {
            type: Number
        },

        isPublic: {
            type: Boolean,
            required: true
        },

        isCompleted: {
            type: Boolean,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    },
    { timestamps: true }
)

export default model<ITodo>("Todo", todoSchema)