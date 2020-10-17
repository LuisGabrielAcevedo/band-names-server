const express = require("express");
const path = require("path");
require("dotenv").config();

// App express
const app = express();
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// Node server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/sockets");

server.listen(3000, (err) => {
  if (err) throw new Error(err);
  console.log("Server run in port:", process.env.PORT);
});
