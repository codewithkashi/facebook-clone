import Notification from "@models/Notification";
import User from "@models/User";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json("bad request");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const notification = await Notification.find({
      user: currentUser?._id,
    }).sort({ createdAt: "desc" });
    if (notification) {
      await User.findByIdAndUpdate(currentUser?._id, { notifications: [] });
      res.status(200).json(notification);
    }
  } catch (error) {
    res.status(422).json("Intenal server error");
  }
};
export default handler;
