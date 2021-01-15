const socket = io();

//elements
const form = document.getElementById("form");
const inputTbx = document.getElementById("input");
const locationBtn = document.getElementById("showLocation");
const messages = document.getElementById("messages");
const locations = document.getElementById("locations");

//templates
const messageTemplate = document.getElementById("messageTemplate").innerHTML;
const locationTemplate = document.getElementById("locationTemplate").innerHTML;

socket.on("message", (message) => {
  console.log(message);
  let html = Mustache.render(messageTemplate, {
    message,
  });
  messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (location) => {
  console.log(location);
  let html = Mustache.render(locationTemplate, {
    location,
  });
  locations.insertAdjacentHTML("beforeend", html);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputTbx.setAttribute("disabled", "disabled");
  if (inputTbx.value) {
    socket.emit("sendMessage", inputTbx.value, (error) => {
      inputTbx.removeAttribute("disabled");
      inputTbx.focus();
      if (error) {
        console.log(error);
      } else {
        console.log("Message delivered.");
      }
    });
    inputTbx.value = "";
  }
});

locationBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!navigator.geolocation) {
    alert("Geolocation is not supported ny your browser.");
  } else {
    locationBtn.setAttribute("disabled", "disabled");
    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit(
        "sendLocation",
        position.coords.latitude,
        position.coords.longitude,
        (confirmLocation) => {
          locationBtn.removeAttribute("disabled");
          if (confirmLocation) {
            console.log(confirmLocation);
          } else {
            console.log("Location not found.");
          }
        }
      );
    });
  }
});
