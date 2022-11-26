require("dotenv").config();
const mysql = require("../client/node_modules/mysql");

const DB_INFO = {
  host: process.env.DB_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};
const db = mysql.createConnection(DB_INFO);
db.connect();

module.exports = db;
