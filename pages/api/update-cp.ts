import User from "@models/User";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad request");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const { coverImage } = req.body;
    console.log(coverImage);
    const updated = await User.findByIdAndUpdate(currentUser?._id, {
      coverImage: coverImage,
    });
    if (updated) return res.status(200).json("Conver Image Updated");
  } catch (error) {
    console.log(error);
    res.status(422).json("Internal server error");
  }
};
export default handler;
