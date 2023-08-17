import User from "@models/User";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json("bad request");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const user = await User.findById(currentUser._id)
      .populate({
        path: "receivedRequests",
        select: "_id name profileImage",
      })
      .populate({
        path: "sentRequests",
        select: "_id name profileImage",
      });
    res.status(200).json(user);
  } catch (error) {
    res.status(422).json("Intenal server error");
    console.log(error);
  }
};
export default handler;
