import mongoose from "mongoose";
const savedSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  referId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  createdAt: { type: Date, default: Date.now() },
});
mongoose.models = {};
const Saved = mongoose.model("Saved", savedSchema);
export default Saved;
