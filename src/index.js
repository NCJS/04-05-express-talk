import express from "express";
import bodyParser from "body-parser";
import chalk from "chalk";
require("dotenv").config();
import { searchFirstName } from "./utils";
import routes from "./routes";

const app = express();

// Middleware getting called everytime
const Logger = (req, res, next) => {
  const { query, method, params } = req;
  console.log("method : ", method);
  console.log("query  : ", query);
  console.log("------------------------------");
  next();
};

app.use(Logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 'redirect' /api routes to 'routes'
app.use("/api", routes);

// app.get("/", (req, res) => res.send("Hello World!"));
// Using params in URL through /params/:parameterName
app.get("/params/:p", (req, res) => {
  const { params } = req;
  console.log("params :", params);
  res.status(200).json({ params: params });
});

// Using queries in URL lilke ?firstName=Brice
app.get("/", (req, res) => {
  let { query } = req;
  let { firstName } = query;
  if (firstName) {
    let results = searchFirstName(firstName);
    res.status(200).json({ users: results });
  } else {
    res.status(200).json({ message: "Hello World" });
  }
});

// Intercepting all other requests that haven't been 'caught' yet
app.get("*", (req, res) => {
  res.status(404).json({ error: "No such route!" });
});

// Get PORT environment variable, if not available use 4010
const PORT = process.env.PORT || 4010;

// Start server
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
