import User from "../models/User.js";
import Transaction from "../models/transaction.js";

export const overview = async (req, res) => {
  const users = await User.countDocuments();
  const transactions = await Transaction.countDocuments();

  res.json({ users, transactions });
};