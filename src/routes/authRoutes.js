import express from "express";

import {
  register,
  login,
  profile
} from "../controllers/auth.js";

import { protect } from "../middleware/authMiddleware.js";

import validate from "../middleware/validateMiddleware.js";

import {
  registerSchema,
  loginSchema
} from "../validations/authValidation.js";


const router = express.Router();


// Register with Zod validation
router.post(
  "/register",
  validate(registerSchema),
  register
);


// Login with Zod validation
router.post(
  "/login",

  validate(loginSchema),
  login
);


// Protected Profile route (JWT)
router.get(
  "/profile",
  protect,
  profile
);


export default router;