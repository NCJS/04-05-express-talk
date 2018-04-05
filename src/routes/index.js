import express from "express";
import { user, users } from "./user";
const routes = express.Router();
// const routes = require("express").Router();

routes.use("/users", users);
routes.use("/user", user);

routes.use("/", (req, res) => {
  res
    .status(200)
    .send(
      "get's used when no other route is matched, no matter the method (GET/PUT/POST/DELETE)"
    );
});
// routes.use('/something', someOtherRoute)

// module.exports = routes;
export default routes;
