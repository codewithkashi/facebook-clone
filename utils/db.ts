import Comment from "@models/Comment";
import Post from "@models/Post";
import Reply from "@models/Reply";
import User from "@models/User";
import mongoose from "mongoose";
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
    inConnected = true;
  } catch (error: any) {
    console.log(`Failed to connect to Database: ${error.message}`);
  }
};

export { connectToDB };