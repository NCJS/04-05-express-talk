const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/one", (req, res) => res.send("one endpoint"));
app.get("/two", (req, res) => res.send("two endpoint "));

app.listen(4000, () => console.log("Example app listening on port 4000!"));
