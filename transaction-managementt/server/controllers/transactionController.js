// server/controllers/transactionController.js
const Transaction = require('../models/Transaction');

const createTransaction = (req, res) => {
  const { amount, transaction_type, user_id } = req.body;
  Transaction.create(amount, transaction_type, user_id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating transaction' });
    }
    res.status(201).json({
      transaction_id: result.insertId,
      amount,
      transaction_type,
      status: 'PENDING',
      user_id,
      timestamp: new Date().toISOString(),
    });
  });
};

const getTransactionsByUser = (req, res) => {
  const { user_id } = req.query;
  Transaction.getAllByUser(user_id, (err, transactions) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving transactions' });
    }
    res.status(200).json({ transactions });
  });
};

const updateTransactionStatus = (req, res) => {
  const { transaction_id } = req.params;
  const { status } = req.body;
  if (status !== 'COMPLETED' && status !== 'FAILED') {
    return res.status(400).json({ message: 'Invalid status' });
  }
  Transaction.updateStatus(transaction_id, status, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating transaction status' });
    }
    res.status(200).json({
      transaction_id,
      status,
      timestamp: new Date().toISOString(),
    });
  });
};

const getTransactionById = (req, res) => {
  const { transaction_id } = req.params;
  Transaction.getById(transaction_id, (err, transaction) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving transaction' });
    }
    res.status(200).json(transaction);
  });
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
  updateTransactionStatus,
  getTransactionById,
};
