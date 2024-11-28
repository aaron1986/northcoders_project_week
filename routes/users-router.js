const express = require("express");
const { getUsers } = require("../db/controller/topics.controller");

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

module.exports = usersRouter;
