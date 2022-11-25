const express = require("express");
const apiProxy = createProxyMiddleware("/api", {
  target: "http://localhost:5000",
  changeOrigin: true
});
module.exports = function (app) {
  app.use("/api", apiProxy);
};
