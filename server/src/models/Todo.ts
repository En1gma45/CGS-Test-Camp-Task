import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the Profile Schema for TypeScript.
 * @param title:string
 * @param description:string
 * @param year:number
 * @param public:boolean
 * @param completed:boolean
 */

export interface ITodos extends Document{
  title: string,
  description: string,
  year: number,
  public: boolean,
  completed:boolean
}

const todoSchema: Schema = new Schema({
  title: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required:true
  },
  year: {
    type: Number,
    required:true
  },
  public: {
    type:Boolean
  },
  completed: {
    type:Boolean
  }
})

const Todo: Model<ITodos> = model("todo", todoSchema);

export default Todo
