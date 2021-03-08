const externalApi = require("./services");

module.exports = function (router) {
  router.get("/search-fact", (req, res) => {
    url = "https://api.chucknorris.io/jokes/random";
    externalApi.getResult(url, res);
  });

  router.get("/categories", (req, res) => {
    var url = "https://api.chucknorris.io/jokes/categories";
    externalApi.getResult(url, res);
  });

  router.get("/category/:category", (req, res) => {
    var category = req.params.category;
    var url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    externalApi.getResult(url, res);
  });

  router.get("/search/:text", (req, res) => {
    var text = req.params.text;
    url = `https://api.chucknorris.io/jokes/search?query=${text}`;
    externalApi.getResult(url, res);
  });
};
