//nmp module
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
//core module
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

let count = 0;
//static dir to serve
app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("User connected.");

  socket.on("increment", () => {
    count++;
    // socket.emit("countUpdate", count);
    io.emit("countUpdate", count);
  });
});

server.listen(port, () => {
  console.log("Server is up and running on port " + port + ".");
});
