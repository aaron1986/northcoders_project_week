const req = require('supertest');
const express = require("express")
const {getApi, getTopics} = require('./db/controller/topics.controller')
const app = express()

app.use(express.json())

//GET api and endPoints
app.get("/api", getApi)
app.get("/api/topics", getTopics) 


module.exports = app