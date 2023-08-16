import Group from "@models/Group";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad request");
  try {
    await serverAuth(req, res);
    const { coverImage, id } = req.body;
    const updated = await Group.findByIdAndUpdate(id, {
      imgUrl: coverImage,
    });
    if (updated) return res.status(200).json("Conver Image Updated");
  } catch (error) {
    console.log(error);
    res.status(422).json("Internal server error");
  }
};
export default handler;
