import { ITodo } from "./../types/todoTypes"
import { model, Schema } from "mongoose";

const todoSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        year: {
            type: Number,
            required: true
        },

        isPublic: {
            type: Boolean,
            required: true,
        },

        isCompleted: {
            type: Boolean,
            required: true,
        },

    },
    { timestamps: true }
)

export default model<ITodo>("Todo", todoSchema)