import mongoose, { Model } from "mongoose";

interface DocumentResult<T> {
  _doc: T;
}

export interface IUser extends DocumentResult<IUser> {
  username: string;
  email: string;
  password: string;
  profileProfile: string;
  followers: string[];
  following: string[];
  description: string;
  cratedAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileProfile: { type: String },
    followers: { type: [String], default: [] },
    following: { type: [String], default: [] },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema)

export default User
