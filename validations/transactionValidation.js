import { z } from "zod";

// Allowed values
const transactionTypes = ["income", "expense"];

// ✅ Create / Update Transaction Schema
export const transactionSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters"),

  amount: z
    .number({
      invalid_type_error: "Amount must be a number"
    }),

  type: z
    .string()
    .refine((val) => transactionTypes.includes(val), {
      message: "Type must be 'income' or 'expense'"
    }),

  category: z
    .string()
    .min(2, "Category is required"),

  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format"
    })
});