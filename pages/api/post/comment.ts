import { connectToDB } from "@utils/db";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import Comment from "@models/Comment";
import Post from "@models/Post";
import Notification from "@models/Notification";
import User from "@models/User";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad request");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const { postId, desc } = req.body;
    const comment = await Comment.create({
      creator: currentUser?._id,
      postId,
      desc,
    });
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment?.id } },
      { new: true }
    );
    const user = await User.findById(post?.creator);
    const notf = await Notification.create({
      user: user?._id,
      imgUrl: currentUser?.profileImage,
      desc: `${currentUser?.name} commented on your post`,
      url: `/post/${postId}`,
    });
    await User.findByIdAndUpdate(
      user?._id,
      { $push: { notifications: notf._id } },
      { new: true }
    );
    if (comment) return res.status(201).json("Commented");
  } catch (error) {
    res.status(422).json("Internal server error");
  }
};

export default handler;
