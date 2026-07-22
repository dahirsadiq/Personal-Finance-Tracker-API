
import swaggerSpec from "../config/swagger.js"
import express from "express";
import {
  upload,
  uploadProfile
} from "../controllers/upload.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload Profile Picture


/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload an image
 *     description: Upload a single image file (JPEG, PNG, WEBP)
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image uploaded successfully
 *                 file:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                       example: image-1723456789.png
 *                     path:
 *                       type: string
 *                       example: uploads/image-1723456789.png
 *       400:
 *         description: Invalid file type
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/profile-picture",
  protect,
  upload.single("image"), // field name = image
  uploadProfile
);

export default router;