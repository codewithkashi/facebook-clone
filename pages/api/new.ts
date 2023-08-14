import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json("DOne");
}
