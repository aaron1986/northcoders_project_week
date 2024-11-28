const express = require("express");
const apiRouter = require("./routes/api-router");
const app = express();
app.use(express.json());

app.use("/api", apiRouter);

//example for postman
app.get("/test", async (req, res) => {
    res.json({ message: "pass!" });
  });

//throw error if endpoint not found
app.all("*", (req, res) => {
    res.status(404).send({ msg: "Endpoint not found here!" });
  });

module.exports = app