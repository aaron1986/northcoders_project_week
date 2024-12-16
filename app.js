const express = require("express");
const apiRouter = require("./routes/api-router");
const app = express();
app.use(express.json());

app.use("/api", apiRouter);
const cors = require('cors');
app.use(cors());

//example for postman
app.get("/test", async (req, res) => {
    res.json({ message: "pass!" });
  });

//throw error if endpoint not found
app.all("*", (req, res) => {
    res.status(404).send({ msg: "Endpoint not found here!" });
  });

  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err); 
    }
    if (err.status) {
      res.status(err.status).send({ msg: err.msg });
    } else {
      res.status(500).send({ msg: "Internal server error" });
    }
  });
  


module.exports = app