import Saved from "@models/Saved";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    if (req.method === "POST") {
      const saved = await Saved.create({ user: currentUser?._id, referId: id });
      if (saved) return res.status(200).json("Saved!");
    }
    if (req.method === "DELETE") {
      const saved = await Saved.findByIdAndDelete(id);
      if (saved) return res.status(200).json("Unsaved!");
    }
  } catch (error) {
    console.log(error);
  }
  res.status(422).json("Internal server error");
};

export default handler;
