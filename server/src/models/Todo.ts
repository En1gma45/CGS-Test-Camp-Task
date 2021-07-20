import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param title:string
 * @param description:string
 */
export interface ITodo extends Document {
  title: string;
  description: string;
  public: boolean;
  completed: boolean;
}

const todoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  year: {
    type: Date,
    default: Date.now
  },
  isPublic: {
      type: Boolean,
      required: true
  },
  completed: {
    type: Boolean,
    required: true
}
});

const Todo: Model<ITodo> = model("Todo", todoSchema);

export default Todo;
