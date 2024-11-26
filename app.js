const req = require('supertest');
const express = require("express")
const {
    getApi, 
    getTopics, 
    getArticleById, 
    getArticles, 
    getComments, 
    postComment,
    patchArticle,
    deleteComment,
    getUsers,
} = require('./db/controller/topics.controller')
    
const app = express()

app.use(express.json())

//GET api and endPoints
app.get("/api", getApi)
app.get("/api/topics", getTopics) 
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getArticles);
app.get("/api/articles/:article_id/comments", getComments)

app.get("/api/users", getUsers)

//POST api and endPoints
app.post('/api/articles/:article_id/comments', postComment)

//PATCH article id
app.patch("/api/articles/:article_id", patchArticle)

//DELETE 
app.delete('/api/comments/:comment_id', deleteComment)


module.exports = app