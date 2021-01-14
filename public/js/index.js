const socket = io();

//var messages = document.getElementById("messages");
var form = document.getElementById("form");
//var input = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("click");
  socket.emit("increment");
});

socket.on("countUpdate", function (count) {
  console.log("The count", count);
});
