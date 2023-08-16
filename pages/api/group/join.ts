import Group from "@models/Group";
import User from "@models/User";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad request");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const { id } = req.body;
    const joined = await Group.findByIdAndUpdate(id, {
      $push: { members: currentUser?._id },
    });
    await User.findByIdAndUpdate(currentUser?._id, {
      $push: { groups: joined?._id },
    });
    if (!joined) return res.status(404).json("Inalid group id");
    res.status(200).json("Group Joined");
  } catch (error) {
    console.log(error);
    res.status(422).json("Internal server error");
  }
};
export default handler;
