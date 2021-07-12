import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the Todo Schema for TypeScript.
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
  isPublic: boolean;
  isCompleted: boolean;
}

const todoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

const Todo: Model<ITodo> = model("Todo", todoSchema);

export default Todo;