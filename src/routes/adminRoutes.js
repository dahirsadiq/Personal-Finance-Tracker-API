import express from "express";
import { overview } from "../controllers/admin.js";

import {
  protect,
  isAdmin
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin Overview (Protected + Admin Only)
router.get(
  "/overview",
  protect,
  isAdmin,
  overview
);

export default router;