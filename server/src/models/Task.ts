import { Schema, model, Model, Document, Types } from "mongoose";

/**
 * Interface to model the Profile Schema for TypeScript.
 * @param title:string
 * @param description:string
 * @param year:number
 * @param public:boolean
 * @param completed:boolean
 * @param owner:Types.ObjectId
 */

export interface ITask extends Document {
    title: string;
    description: string;
    year: number;
    isPublic: boolean;
    isCompleted: boolean;
    owner: Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
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
    },
    owner: {
        type: Types.ObjectId,
        ref: "User"
    }

});

const Task: Model<ITask> = model("Task", TaskSchema);

export default Task;
