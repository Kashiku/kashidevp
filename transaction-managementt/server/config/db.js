// server/config/db.js
const mysql = require('mysql2');

// Load environment variables from .env file
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = connection;
