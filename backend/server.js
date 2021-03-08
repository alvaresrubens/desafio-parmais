const express = require("express");
const app = express();
const port = 3030;
var cors = require("cors");
const routes = require("./routes.js");

app.use(cors());
routes(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
