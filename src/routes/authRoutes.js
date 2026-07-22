
import express from "express";
import swaggerSpec from "../config/swagger.js"

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

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dahir
 *               email:
 *                 type: string
 *                 example: dahir@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/register",
  validate(registerSchema),
  register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login success (returns token)
 */
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