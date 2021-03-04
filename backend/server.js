const express = require("express");
const app = express();
const port = 3030;
var cors = require("cors");

app.use(cors());

app.get("/search-fact", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
