import mongoose from "mongoose";
const groupSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  imgUrl: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
mongoose.models = {};
const Group = mongoose.model("Group", groupSchema);
export default Group;
