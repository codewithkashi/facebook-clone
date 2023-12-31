import Notification from "@models/Notification";
import Reply from "@models/Reply";
import User from "@models/User";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const { id } = req.body;
    if (req.method === "POST") {
      const reply = await Reply.findByIdAndUpdate(
        id,
        { $push: { likes: currentUser?.id } },
        { new: true }
      );
      if (!reply) return res.status(404).json("Invalid comment id");
      return res.status(200).json("Success");
    }
    if (req.method === "DELETE") {
      const reply = await Reply.findByIdAndUpdate(
        id,
        { $pull: { likes: currentUser?.id } },
        { new: true }
      );

      const notf = await Notification.create({
        user: reply?.creator,
        imgUrl: currentUser?.profileImage,
        desc: `${currentUser?.name} liked on your comment`,
        url: `/post/${reply?.postId}`,
      });

      await User.findByIdAndUpdate(
        reply?.creator,
        { $push: { notifications: notf._id } },
        { new: true }
      );
      if (!reply) return res.status(404).json("Invalid comment id");
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
