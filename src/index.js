//nmp module
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");
//core module
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

//static dir to serve
app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.broadcast.emit("message", "A new user has joined!");

  socket.on("sendMessage", (message, callback) => {
    let filter = new Filter();
    if (filter.isProfane(message)) {
      callback("Backwords are not allowed.");
    } else {
      io.emit("message", message);
      callback("Message was delivered");
    }
  });

  socket.on("sendLocation", (lat, lon, callback) => {
    io.emit("message", `https://www.openstreetmap.org/#map=18/${lat}/${lon}`);
    callback("Location found.");
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });
});

server.listen(port, () => {
  console.log("Server is up and running on port " + port + ".");
});
