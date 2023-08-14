import mongoose from "mongoose";
const replySchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  desc: { type: String, required: false },
  createdAt: { type: Date, default: Date.now() },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
mongoose.models = {};

const Reply = mongoose.model("Reply", replySchema);
export default Reply;
