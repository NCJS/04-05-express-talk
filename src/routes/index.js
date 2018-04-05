import express from "express";
import users from "./users";
import user from "./user";
import data from "../data";
import find from "lodash/find";
const routes = express.Router();
// const routes = require("express").Router();

const searchFirstName = name => {
  name = name.toLowerCase();
  let firstNames = name.split(",");
  console.log("firstNames", firstNames);
  let results = [];
  firstNames.map(n => {
    console.log("n", n);
    results.push(
      find(data, o => {
        return n === o.firstName.toLowerCase();
      })
    );
  });
  return results;
};

routes.use("/users", users);
routes.use("/user", user);
routes.get("/", (req, res) => {
  let { query } = req;
  let { firstName } = query;
  if (firstName) {
    let results = searchFirstName(firstName);
    res.status(200).json({ users: results });
  } else {
    res.status(200).json({ message: "API endpoint" });
  }
});

// module.exports = routes;
export default routes;
