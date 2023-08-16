import Group from "@models/Group";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json("bad request");
  try {
    await serverAuth(req, res);
    const allGroups = await Group.find();
    return res.status(200).json(allGroups);
  } catch (error) {
    console.log(error);
    res.status(422).json("Internal server error");
  }
};

export default handler;
