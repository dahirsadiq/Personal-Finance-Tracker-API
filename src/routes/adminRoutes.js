import swaggerSpec from "../config/swagger.js";
import express from "express";
import { overview } from "../controllers/admin.js";

import {
  protect,
  isAdmin
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin Overview (Protected + Admin Only)


/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     description: Admin can fetch all registered users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   isAdmin:
 *                     type: boolean
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.get(
  "/overview",
  protect,
  isAdmin,
  overview
);

export default router;