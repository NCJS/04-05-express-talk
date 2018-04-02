import express from "express";
require("dotenv").config();

const app = express();

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/one", (req, res) => res.send("one endpoint"));
app.get("/two", (req, res) => res.send("two endpoint "));

const PORT = process.env.PORT || 4010;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
