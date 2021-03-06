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

app.get("/categories", (req, res) => {
  axios
    .get("https://api.chucknorris.io/jokes/categories")
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log("Error");
    });
});

app.get("/category:category", (req, res) => {
  var category = req.params.category;
  axios
    .get(`https://api.chucknorris.io/jokes/random?category=${category}`)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log("Error");
    });
});

app.get("/search:text", (req, res) => {
  var text = req.params.text;
  axios
    .get(`https://api.chucknorris.io/jokes/search?query=${text}`)
    .then((response) => {
      console.log(response.data.result);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log("Error");
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
