import express from "express";
import data from "../../data";
const users = express.Router();

users.get("/", (req, res) => {
  console.log("users endpoint");
  res.status(200).json({ users: data });
});
users.delete("/", (req, res) => {
  // NOTE: Why does data = [] throw ERROR 'data' is read-only
  // data = [];
  // DB implemenation would be here....
  data.length = 0;
  res.status(200).json({ users: data });
});

// If POST /api/users get's 'hit' it will fall back to /routes/index.js routes.use('/')

// module.exports = users;
export default users;
