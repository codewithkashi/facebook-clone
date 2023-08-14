import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@utils/db";
import User from "@models/User";
import bcrypt from "bcrypt";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad request");
  try {
    await connectToDB();
    const { name, email, password, dob, gender } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(404).json("Email already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, dob, gender });
    return res.status(201).json("Account created");
  } catch (error) {
    res.status(422).json("Internal Server Error");
    console.log(error);
  }
};
export default handler;
