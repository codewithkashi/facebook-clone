import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import User from "@models/User";
import { connectToDB } from "./db";

const serverAuth = async (req, res) => {
  try {
    await connectToDB();
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(404).json("Not signed in");
    }

    const currentUser = await User.findOne({ email: session?.user?.email });
    if (!currentUser) {
      return res.status(404).json("Not signed in");
    }

    return { currentUser };
  } catch (error) {
    console.log(error);
  }
};

export default serverAuth;
