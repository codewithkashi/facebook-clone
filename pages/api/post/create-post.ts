import Post from "@models/Post";
import serverAuth from "@utils/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad request");
  try {
    const { currentUser } = (await serverAuth(req, res)) as Record<string, any>;
    const {
      desc,
      imgUrl,
      forGroup,
      groupId,
      sharedCreator,
      sharedDesc,
      sharedGroupId,
    } = req.body;
    await Post.create({
      creator: currentUser.id,
      desc,
      imgUrl,
      groupId,
      forGroup,
      sharedCreator,
      sharedDesc,
      sharedGroupId,
    });
    res.status(201).json("Post created");
  } catch (error) {
    res.status(422).json("Internal server error");
    console.log(error);
  }
};

export default handler;