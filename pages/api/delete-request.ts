import User from "@models/User";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad request");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const { id } = req.body;
    const user = await User.findByIdAndUpdate(
      currentUser?._id,
      { $pull: { receivedRequests: id } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      id,
      { $pull: { sentRequests: currentUser?._id } },
      { new: true }
    );

    if (!user) return res.status(404).json("Invalid user id");
    return res.status(200).json("Request Rejected");
  } catch (error) {
    console.log(error);
    res.status(422).json("Internal sever error");
  }
};

export default handler;
