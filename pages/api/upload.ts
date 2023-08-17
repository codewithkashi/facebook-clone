import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import serverAuth from "@utils/serverAuth";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json("bad request");
  const { path } = req.body;
  try {
    await serverAuth(req, res);
    if (path) {
      const options = {
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      };
      const result = await cloudinary.uploader.upload(path, options);
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(422).json("Internal server error");
    console.log(error);
  }
};
export default handler;
