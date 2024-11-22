const db = require('../config/db');

const Transaction = {
  create: (amount, transaction_type, user_id, callback) => {
    const query = 'INSERT INTO transactions (amount, transaction_type, user_id, status) VALUES (?, ?, ?, ?)';
    db.query(query, [amount, transaction_type, user_id, 'PENDING'], callback);
  },

  getAllByUser: (user_id, callback) => {
    const query = 'SELECT * FROM transactions WHERE user_id = ?';
    db.query(query, [user_id], callback);
  },

  updateStatus: (transaction_id, status, callback) => {
    const query = 'UPDATE transactions SET status = ? WHERE transaction_id = ?';
    db.query(query, [status, transaction_id], callback);
  },

  getById: (transaction_id, callback) => {
    const query = 'SELECT * FROM transactions WHERE transaction_id = ?';
    db.query(query, [transaction_id], callback);
  }
};

module.exports = Transaction;
