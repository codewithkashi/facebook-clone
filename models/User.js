import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, select: false, required: true },
  dob: String,
  gender: String,
  createdAt: { type: Date, default: Date.now() },
  bio: { type: String, require: false },
  profileImage: { type: String, require: false },
  coverImage: { type: String, require: false },
  receivedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
  ],
});
mongoose.models = {};
const User = mongoose.model("User", userSchema);
export default User;
