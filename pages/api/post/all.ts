import Post from "@models/Post";
import { connectToDB } from "@utils/db";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") res.status(405).json("bad request");
  try {
    await connectToDB();
    await serverAuth(req, res);
    const posts = await Post.find()
      .populate("creator")
      .sort({
        createdAt: "desc",
      })
      .populate("comments");
    res.status(200).json(posts);
  } catch (error) {
    res.status(422).json("Internal server error");
    console.log(error);
  }
};

export default handler;
