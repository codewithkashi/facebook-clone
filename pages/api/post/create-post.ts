import Group from "@models/Group";
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
    if (forGroup === true) {
      if (!groupId && !sharedGroupId) {
        return res.status(404).json("Group not found");
      } else {
        const sharedFoundGroup = await Group.findById(sharedGroupId);
        const foundGroup = await Group.findById(groupId);
        if (!foundGroup && !sharedFoundGroup)
          return res.status(404).json("Group not found");
        if (
          !foundGroup?.members?.includes(currentUser?._id) &&
          !sharedFoundGroup?.members?.includes(currentUser?._id)
        )
          return res.status(404).json("Join Group to Post");
      }
    }

    await Post.create({
      creator: currentUser.id,
      desc,
      imgUrl,
      groupId: groupId || null,
      forGroup,
      sharedCreator: sharedCreator || null,
      sharedDesc,
      sharedGroupId: sharedGroupId || null,
    });
    res.status(201).json("Post created");
  } catch (error) {
    res.status(422).json("Internal server error");
    console.log(error);
  }
};

export default handler;
