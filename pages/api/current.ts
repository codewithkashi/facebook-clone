import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json("bad request");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(422).json("Intenal server error");
    console.log(error);
  }
};
export default handler;
