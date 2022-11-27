const express = require("express");
const app = express();
const test = require("./test");
const cors = require("../client/node_modules/cors");
const db = require("./db");

//use express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//check database
db.query("SELECT * from user", function (error, results, fields) {
  if (error) throw error;
});

//router
app.use("/api", test);

//open server at port 5000
app.listen(5000, function () {
  console.log("listening on 5000");
});
