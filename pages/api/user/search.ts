import User from "@models/User";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json("bad request");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const { text } = req.query;
    const data = await User.find(
      {
        _id: { $ne: currentUser?._id },
        name: { $regex: text, $options: "i" },
      },
      "_id name profileImage"
    );
    if (data) return res.status(200).json(data);
    return res.status(404).json("No data found");
  } catch (error) {
    console.log(error);
    res.status(422).json("Internal server error");
  }
};

export default handler;
