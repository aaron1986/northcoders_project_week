const express = require("express");
const { getUsers, getUsername } = require("../db/controller/topics.controller");

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:username", getUsername);

module.exports = usersRouter;