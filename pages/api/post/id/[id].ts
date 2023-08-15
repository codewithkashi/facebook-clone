import Post from "@models/Post";
import { connectToDB } from "@utils/db";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") res.status(405).json("bad request");
  try {
    await connectToDB();
    await serverAuth(req, res);
    const { id } = req.query;

    const post = await Post.findById(id).populate([
      {
        path: "comments",
        options: { sort: { createdAt: "desc" } },
        populate: [
          {
            path: "creator",
            model: "User",
            select: "_id name profileImage",
          },
          {
            path: "replies",
            model: "Reply",
            populate: [
              {
                path: "creator",
                model: "User",
                select: "_id name profileImage",
              },
              {
                path: "replyTo",
                model: "User",
                select: "_id name profileImage",
              },
            ],
          },
        ],
      },
      {
        path: "creator",
        select: "_id name profileImage",
      },
    ]);
    res.status(200).json(post);
  } catch (error) {
    res.status(422).json("Internal server error");
    console.log(error);
  }
};

export default handler;
