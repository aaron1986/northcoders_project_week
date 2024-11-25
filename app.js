const req = require('supertest');
const express = require("express")
const {getApi, getTopics, getArticleById, getArticles} = require('./db/controller/topics.controller')
const app = express()

app.use(express.json())

//GET api and endPoints
app.get("/api", getApi)
app.get("/api/topics", getTopics) 
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getArticles);

module.exports = app