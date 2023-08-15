import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  desc: { type: String, required: false },
  url: { type: String, required: false },
  imgUrl: { type: String, required: false },
  createdAt: { type: Date, default: Date.now() },
});
mongoose.models = {};
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
