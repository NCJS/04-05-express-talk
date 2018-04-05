import express from "express";
import data from "../../data";
import { find, findIndex } from "lodash";
import messages from "./msg";
const user = express.Router();

user.use(
  "/:id/msg",
  (req, res, next) => {
    req.userID = req.params.id; // attaches :id parameter to req {}
    next();
  },
  messages
);

user.get("/:id", (req, res) => {
  const { params } = req;
  const { id } = params;
  // Needs parseInt() becuase params come as String, id in data is Integer
  let user = find(data, o => o.id === parseInt(id));
  res.status(200).json({ user });
});

user.delete("/:id", (req, res) => {
  // Fancy nested destructuring....
  const { params: { id } } = req;
  // finds user with id
  let user = find(data, o => o.id === parseInt(id));
  // find index of user with id
  let index = findIndex(data, o => o.id === parseInt(id));
  // Removes user from data,
  data.splice(index, 1);
  if (user) {
    res.status(200).json({ removedUser: user });
  } else {
    res.status(400).json({ err: `user with id ${id} not found` });
  }
});

user.put("/:id", (req, res) => {
  let { body } = req;
  let { firstName, lastName } = body;
  if (firstName && lastName) {
    let user = find(data, o => o.id === parseInt(req.params.id));
    if (user) {
      // Would need updating user in DB...
      user.firstName = firstName;
      user.lastName = lastName;
      console.log("user", user);
      res.status(200).json({ user });
    } else {
      res.status(400).json({ msg: `No user with id ${req.params.id} found` });
    }
  } else {
    res.status(400).json({ msg: "Needs firstName && lastName to be modified" });
  }
});

user.post("/", (req, res) => {
  let { body: { firstName, lastName } } = req;
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  const newId = data[data.length - 1].id + 1;
  const newUser = { firstName, lastName, id: newId, phone: "911" };
  // DB implementation here....
  data.push(newUser);
  res.status(200).json({ user: newUser });
});

export default user;
