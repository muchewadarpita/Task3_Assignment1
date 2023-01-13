const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();

app.use(express.json());
var database;

app.get("/customer", (req, res) => {
  database
    .collection("customer")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

app.get("/customer/:id", (req, resp) => {
  database
    .collection("customer")
    .find({ name: req.params.id })
    .toArray((err, result) => {
      if (err) throw err;
      resp.send(result);
    });
});

app.listen(3000, () => {
  MongoClient.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true },
    (error, result) => {
      if (error) throw error;
      database = result.db("clientdatabase");
      console.log("connection sucessful");
    }
  );
});
