import Group from "@models/Group";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json("bad request");
  try {
    await serverAuth(req, res);
    const { id } = req.query;
    const group = await Group.findById(id);
    if (group) return res.status(200).json(group);
    return res.status(404).json("Invalid group id");
  } catch (error) {
    console.log(error);
    res.status(422).json("Internal server error");
  }
};

export default handler;
