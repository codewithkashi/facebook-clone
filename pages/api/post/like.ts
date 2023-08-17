import Notification from "@models/Notification";
import Post from "@models/Post";
import User from "@models/User";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const { id } = req.body;
    if (req.method === "POST") {
      const post = await Post.findByIdAndUpdate(
        id,
        { $push: { likes: currentUser?.id } },
        { new: true }
      );

      const notf = await Notification.create({
        user: post?.creator,
        imgUrl: currentUser?.profileImage,
        desc: `${currentUser?.name} liked your post`,
        url: `/post/${post?._id}`,
      });
      await User.findByIdAndUpdate(
        post?.creator,
        { $push: { notifications: notf._id } },
        { new: true }
      );

      if (!post) return res.status(404).json("Invalid post id");
      return res.status(200).json("Success");
    }
    if (req.method === "DELETE") {
      const post = await Post.findByIdAndUpdate(
        id,
        { $pull: { likes: currentUser?.id } },
        { new: true }
      );
      if (!post) return res.status(404).json("Invalid post id");
      return res.status(200).json("Success");
    } else {
      return res.status(405).json("bad request");
    }
  } catch (error) {
    console.log(error);
    res.status(422).json("Internal sever error");
  }
};

export default handler;
