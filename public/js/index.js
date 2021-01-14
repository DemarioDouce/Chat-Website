const socket = io();

//var messages = document.getElementById("messages");
const form = document.getElementById("form");
const inputTbx = document.getElementById("input");
const locationBtn = document.getElementById("showLocation");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputTbx.value) {
    socket.emit("sendMessage", inputTbx.value);
    inputTbx.value = "";
  }
});

locationBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!navigator.geolocation) {
    alert("Geolocation is not supported ny your browser.");
  } else {
    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit(
        "sendLocation",
        position.coords.latitude,
        position.coords.longitude
      );
    });
  }
});
