const express = require("express");
const app = express();
const test = require("./test");
const cors = require("../client/node_modules/cors");
const db = require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

db.query("SELECT * from user", function (error, results, fields) {
  if (error) throw error;
});

// app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/api", test);
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/public/index.html"));
// });

app.listen(5000, function () {
  console.log("listening on 5000");
});
