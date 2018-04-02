import express from "express";
require("dotenv").config();

const app = express();

const Logger = (req, res, next) => {
  const query = req.query;
  console.log("query: ", query);
  next();
};

app.use(Logger);

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/user/:username", (req, res) => {
  const { params } = req;
  console.log("params :", params);
  res.status(200).json({ user: params.username });
});
app.get("*", (req, res) => {
  res.status(404).send("No such thing");
});

const PORT = process.env.PORT || 4010;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
