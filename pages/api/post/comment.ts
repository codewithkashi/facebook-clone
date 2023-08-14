import { connectToDB } from "@utils/db";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import Comment from "@models/Comment";
import Post from "@models/Post";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad request");
  try {
    await connectToDB();
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const { postId, desc } = req.body;
    const comment = await Comment.create({
      creator: currentUser?._id,
      postId,
      desc,
    });
    console.log(comment._id);
    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment?.id } },
      { new: true }
    );
    console.log(post);
    if (comment) return res.status(201).json("Commented");
  } catch (error) {
    res.status(422).json("Internal server error");
  }
};

export default handler;
