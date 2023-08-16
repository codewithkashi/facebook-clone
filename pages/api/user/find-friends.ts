import User from "@models/User";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json("bad request");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const findfrinds = await User.find({
      _id: {
        $nin: [
          ...currentUser?.sentRequests,
          ...currentUser?.receivedRequests,
          ...currentUser?.friends,
          currentUser?._id,
        ],
      },
    });
    res.status(200).json(findfrinds);
  } catch (error) {
    console.log(error);
    res.status(422).json("Internal server error");
  }
};
export default handler;
