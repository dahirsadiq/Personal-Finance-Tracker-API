import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadProfile = async (req, res) => {
  const file = req.file;

  const result = await cloudinary.uploader.upload_stream(
    { folder: "profiles" },
    (error, result) => {
      if (error) return res.status(500).json(error);
      res.json({ url: result.secure_url });
    }
  );

  result.end(file.buffer);
};