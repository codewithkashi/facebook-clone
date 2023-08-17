import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import Reply from "@models/Reply";
import Comment from "@models/Comment";
import Notification from "@models/Notification";
import User from "@models/User";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad reqest");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const { postId, commentId, replyTo, desc } = req.body;
    const reply = await Reply.create({
      creator: currentUser?.id,
      postId,
      commentId,
      replyTo,
      desc,
    });
    const repliedTo = await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: reply?.id },
    });
    const notf = await Notification.create({
      user: replyTo,
      imgUrl: currentUser?.profileImage,
      desc: `${currentUser?.name} replied to your comment`,
      url: `/post/${reply?.postId}`,
    });
    await User.findByIdAndUpdate(
      replyTo,
      { $push: { notifications: notf._id } },
      { new: true }
    );
    if (reply && repliedTo) res.status(201).json("Comment Added");
  } catch (error) {
    res.status(422).json("Internal server error");
    console.log(error);
  }
};

export default handler;
