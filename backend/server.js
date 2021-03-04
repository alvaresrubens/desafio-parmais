const express = require("express");
const app = express();
const port = 3030;
var cors = require("cors");
const axios = require("axios");

app.use(cors());

app.get("/search-fact", (req, res) => {
  axios
    .get("https://api.chucknorris.io/jokes/random")
    .then((response) => {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log("Error");
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
