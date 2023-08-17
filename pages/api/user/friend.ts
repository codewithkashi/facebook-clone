import Notification from "@models/Notification";
import User from "@models/User";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const { id } = req.body;
    if (req.method === "POST") {
      const user = await User.findByIdAndUpdate(
        currentUser?._id,
        { $push: { sentRequests: id } },
        { new: true }
      );

      await User.findByIdAndUpdate(
        id,
        { $push: { receivedRequests: currentUser?._id } },
        { new: true }
      );
      const notf = await Notification.create({
        user: id,
        imgUrl: currentUser?.profileImage,
        desc: `${currentUser?.name} sent you friend request`,
        url: `/friends`,
      });
      await User.findByIdAndUpdate(
        id,
        { $push: { notifications: notf._id } },
        { new: true }
      );
      if (!user) return res.status(404).json("Invalid user id");
      return res.status(200).json("Requested");
    }
    if (req.method === "DELETE") {
      const user = await User.findByIdAndUpdate(
        currentUser?._id,
        { $pull: { sentRequests: id } },
        { new: true }
      );

      await User.findByIdAndUpdate(
        id,
        { $pull: { receivedRequests: currentUser?._id } },
        { new: true }
      );

      if (!user) return res.status(404).json("Invalid user id");
      return res.status(200).json("Request Cancled");
    } else {
      return res.status(405).json("bad request");
    }
  } catch (error) {
    console.log(error);
    res.status(422).json("Internal sever error");
  }
};

export default handler;
