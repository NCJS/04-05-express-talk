import express from "express";
import data from "../data";
import find from "lodash/find";
const user = express.Router();

user.get("/:id", (req, res) => {
  const { params } = req;
  const { id } = params;
  if (id) {
    let user = find(data, o => o.id === parseInt(id));
    console.log("user", user);
    res.status(200).json({ user });
  } else {
    // Doesn't get hit without /:id
    res.status(400).json({ error: "need to supply ID" });
  }
});

user.put("/:id", (req, res) => {
  let { body } = req;
  let { firstName, lastName } = body;
  if (firstName && lastName) {
    let user = find(data, o => o.id === parseInt(req.params.id));
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      console.log("user", user);
      // Would need updating user in DB...
      res.status(200).json({ user });
    } else {
      res.status(400).json({ msg: `No user with id ${req.params.id} found` });
    }
  } else {
    res.status(400).json({ msg: "Needs firstName && lastName" });
  }
});

export default user;
