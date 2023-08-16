import Saved from "@models/Saved";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json("bad request");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const saved = await Saved.find({ user: currentUser?._id })
      .populate("referId")
      .sort({ createdAt: "desc" });
    return res.status(200).json(saved);
  } catch (error) {
    console.log(error);
    res.status(422).json("Internal server error");
  }
};
export default handler;
