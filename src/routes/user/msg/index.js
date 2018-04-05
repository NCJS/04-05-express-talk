import express from "express";
import data from "../../../data";
const messages = express.Router();
import { find } from "lodash";

messages.get("/", (req, res) => {
  const { userID } = req; //userID is now available on req {}
  console.log("userID from /user/:id ", userID);
  console.log("req.params is empty", req.params);
  let user = find(data, o => o.id === parseInt(userID));
  if (user) {
    let msg = user.msg;
    res.status(200).json({ msg: msg });
  } else {
    res.status(400).json({ err: "user not found" });
  }
});

messages.post("/", (req, res) => {
  const { userID } = req;
  const { msg } = req.body;
  console.log("msg", msg);
  let user = find(data, o => o.id === parseInt(userID));
  if (user) {
    user.msg.push(msg);
    res.status(200).json({ user });
  } else {
    res.status(400).json({ err: "user not found" });
  }
});

export default messages;
