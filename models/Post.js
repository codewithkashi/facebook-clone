import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  desc: { type: String, required: false },
  imgUrl: { type: String, require: false },
  createdAt: { type: Date, default: Date.now() },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  forGroup: { type: Boolean, default: false },
});
mongoose.models = {};
const Post = mongoose.model("Post", postSchema);
export default Post;
