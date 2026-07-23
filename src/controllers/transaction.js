import Transaction from "#src/models/Transaction.js";


import mongoose from "mongoose";

export const createTransaction = async (req, res) => {
  const transaction = await Transaction.create({
    ...req.body,
    user: req.user.id
  });

  res.json(transaction);
};

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id });
  res.json(transactions);
};

export const updateTransaction = async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// 📊 Monthly Summary (IMPORTANT)
export const monthlySummary = async (req, res) => {
  const result = await Transaction.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user.id)
      }
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json(result);
};