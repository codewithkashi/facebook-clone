import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  desc: { type: String, required: false },
  createdAt: { type: Date, default: Date.now() },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
mongoose.models = {};
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
