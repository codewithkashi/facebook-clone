import { connectToDB } from "@utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import User from "@models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad request");
  try {
    await connectToDB();
    const { email, password } = req.body;
    const userData = await User.findOne({ email }).select("+password");

    if (userData == null)
      return res.status(404).json("Email already registered");
    const isMatch = await bcrypt.compare(password, userData.password);
    const token = jwt.sign({ _id: userData.id }, "kashif");
    if (userData.email != null && !isMatch) {
      res.status(404).json("Wrong Password");
    } else if (userData.email != null && isMatch) {
      res
        .status(200)
        .setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            path: "/",
            httpOnly: true,
          })
        )
        .json("Login Successful");
    }
  } catch (error) {
    res.status(422).json("Internal Serve Error");
  }
};

export default handler;
