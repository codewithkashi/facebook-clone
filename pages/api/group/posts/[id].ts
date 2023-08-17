import Post from "@models/Post";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") res.status(405).json("bad request");
  try {
    await serverAuth(req, res);
    const { id } = req.query;
    const posts = await Post.find({ groupId: id })
      .populate([{ path: "creator", select: "_id name profileImage" }])
      .sort({
        createdAt: "desc",
      })
      .populate([{ path: "groupId", select: "_id title imgUrl" }]);
    res.status(200).json(posts);
  } catch (error) {
    res.status(422).json("Internal server error");
    console.log(error);
  }
};

export default handler;
