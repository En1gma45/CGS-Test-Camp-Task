import { Document, Model, model, Schema, Types } from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param tasks:[{ type: Types.ObjectId }]
 */
export interface IUser extends Document {
  email: string;
  password: string;
  tasks: [{
    type: Types.ObjectId,
    ref: 'Task'
  }]
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tasks: [{
    type: Types.ObjectId,
    ref: 'Task'
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

const User: Model<IUser> = model("User", userSchema);

export default User;
