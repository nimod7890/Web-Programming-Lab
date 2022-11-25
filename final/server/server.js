const express = require("express");
const app = express();
const test = require("./router/test");
const cors = require("../client/node_modules/cors");
const mysql = require("../client/node_modules/mysql");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DB_INFO = {
  host: process.env.DB_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};
// console.log(DB_INFO);
const connection = mysql.createConnection(DB_INFO);

connection.connect();
connection.query("SELECT * from user", function (error, results, fields) {
  if (error) throw error;
  // console.log("The solution is: ", results);
});

// app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/api", test);
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/public/index.html"));
// });

app.listen(5000, function () {
  console.log("listening on 5000");
});
