import swaggerSpec from "../config/swagger.js"
import express from "express";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  monthlySummary
} from "../controllers/transaction.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", protect, createTransaction);
/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get("/", protect, getTransactions);

/**
 * @swagger
 * /api/transactions/monthly-summary:
 *   get:
 *     summary: Get monthly transaction summary
 *     description: Returns total income and expenses grouped by month
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly summary fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                     example: "2026-07"
 *                   totalIncome:
 *                     type: number
 *                     example: 5000
 *                   totalExpense:
 *                     type: number
 *                     example: 3200
 *       401:
 *         description: Unauthorized
 */
router.get("/monthly-summary", protect, monthlySummary);

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     description: Update transaction details by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 200
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *                 example: "Food"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-22"
 *               note:
 *                 type: string
 *                 example: "Lunch"
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 */
router.put("/:id", protect, updateTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", protect, deleteTransaction);

export default router;