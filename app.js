//Import
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const input = require("./schema");
const { randomUUID } = require("crypto");

//Express
const app = express();

//Body Parser
app.use(express.json());

//Cors
app.use(cors({ origin: true, credentials: true }));

//Database
mongoose.connect("mongodb+srv://dhiyanesh:26022000@cluster0.segrrp0.mongodb.net/?retryWrites=true", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Connection
const base = mongoose.connection;
base.on("error", console.error.bind(console, "connection error"));
base.once("open", () => {
  console.log("Connection Successful");
});

//Create
app.post("/", (req, res) => {
  const data = new input({
    name: req.body.name,
    email: req.body.email
  });
  if (data.name === "") {
    console.log("Empty Value");
    res.send("Error");
  } else {
    data.save();
    console.log("Data Added Successfully");
    res.send("Data Added Successfully");
  }
});

//Read
app.get("/", (req, res) => {
  input.find({}, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
});

//Update
app.put("/:id", (req, res) => {
  input.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
    if (err) res.send(err);
    else {
      res.send("Data Updated Successfully");
      console.log("Data Updated Successfully");
    }
  });
});

//Delete
app.delete("/:id", (req, res) => {
  input.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) res.send(err);
    else {
      res.send("Data Deleted Successfully");
      console.log("Data Deleted Successfully");
    }
  });
});

//Server
app.listen(5001, () => {
  console.log("Server Started");
});
