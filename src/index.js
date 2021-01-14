//nmp module
const express = require("express");
//core module
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

//static dir to serve
app.use(express.static(publicDirectoryPath));

app.get("/", function (req, res) {
  res.send("index");
});

app.listen(port, () => {
  console.log("Server is up and running on port " + port + ".");
});
