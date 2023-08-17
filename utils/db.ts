import Comment from "@models/Comment";
import Post from "@models/Post";
import Reply from "@models/Reply";
import User from "@models/User";
import mongoose from "mongoose";
import Notification from "@models/Notification";
import Group from "@models/Group";
import Saved from "@models/Saved";
let inConnected = false;
const connectToDB = async () => {
  try {
    if (inConnected) return console.log("Already connected to Database");
    await mongoose.connect(process.env.DATABASE_URL as string, {
      dbName: "facebook",
    });
    console.log("Connected to Database");
    await User.findOne();
    await Post.findOne();
    await Comment.findOne();
    await Reply.findOne();
    await Notification.findOne();
    await Group.findOne();
    await Saved.findOne();
    inConnected = true;
  } catch (error: any) {
    console.log(`Failed to connect to Database: ${error.message}`);
  }
};

export { connectToDB };
