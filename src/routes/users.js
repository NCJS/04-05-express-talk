import express from "express";
import data from "../data";

const users = (req, res) => {
  console.log("users endpoint");
  res.status(200).json({ users: data });
};

// module.exports = users;
export default users;
