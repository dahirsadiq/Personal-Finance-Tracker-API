import express from "express";
import {
  upload,
  uploadProfile
} from "../controllers/upload.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload Profile Picture
router.post(
  "/profile-picture",
  protect,
  upload.single("image"), // field name = image
  uploadProfile
);

export default router;