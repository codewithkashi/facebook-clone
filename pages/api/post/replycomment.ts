import { connectToDB } from "@utils/db";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import Reply from "@models/Reply";
import Comment from "@models/Comment";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad reqest");
  try {
    await connectToDB();
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const { postId, commentId, replyTo, desc } = req.body;
    console.log(postId, commentId, replyTo, desc);
    const reply = await Reply.create({
      creator: currentUser?.id,
      postId,
      commentId,
      replyTo,
      desc,
    });
    const repliedTo = await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: reply?.id },
    });
    if (reply && repliedTo) res.status(201).json("Comment Added");
  } catch (error) {
    res.status(422).json("Internal server error");
    console.log(error);
  }
};

export default handler;
