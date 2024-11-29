const express = require("express");
const { deleteComment } = require("../db/controller/topics.controller");

const commentsRouter = express.Router();

commentsRouter.delete("/:comment_id", deleteComment);

module.exports = commentsRouter;
