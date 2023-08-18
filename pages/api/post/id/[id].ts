import Post from "@models/Post";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") res.status(405).json("bad request");
  try {
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
      {
        path: "groupId",
        select: "_id title imgUrl",
      },
      {
        path: "sharedCreator",
        select: "_id name profileImage",
      },
      {
        path: "sharedGroupId",
        select: "_id title imgUrl",
      },
    ]);
    res.status(200).json(post);
  } catch (error) {
    res.status(422).json("Internal server error");
    console.log(error);
  }
};

export default handler;
