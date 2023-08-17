import User from "@models/User";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json("bad request");
  try {
    await serverAuth(req, res);
    const { id } = req.query;
    const user = await User.findById(id);
    if (user) res.status(200).json(user);
  } catch (error) {
    res.status(422).json("Intenal server error");
    console.log(error);
  }
};
export default handler;
