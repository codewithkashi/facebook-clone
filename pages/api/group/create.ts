import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import Group from "@models/Group";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad request");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const { imgUrl, title, desc } = req.body;
    const group = await Group.create({
      creator: currentUser._id,
      title,
      desc,
      imgUrl,
    });
    if (group) return res.status(201).json("Group created");
  } catch (error) {
    console.log(error);
  }
  res.status(422).json("Internal server error");
};

export default handler;
