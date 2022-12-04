import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
  userName: { type: String, default: "userName" },
  password: { type: String, default: "password" },
});

export const UserModel = mongoose.model("User", User);
