const axios = require("axios");

exports.getResult = (url, res) => {
  axios
    .get(url)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      console.log("Error to load from external api");
    });
};
