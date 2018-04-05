import express from "express";
import bodyParser from "body-parser";
require("dotenv").config();
import routes from "./routes";
const app = express();

const Logger = (req, res, next) => {
  const { query, method } = req;
  console.log("method", method);
  console.log("query: ", query);
  next();
};

app.use(Logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routes);

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/user/:username", (req, res) => {
  const { params } = req;
  console.log("params :", params);
  res.status(200).json({ user: params.username });
});
app.get("*", (req, res) => {
  res.status(404).json({ error: "No such thing" });
});

const PORT = process.env.PORT || 4010;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
