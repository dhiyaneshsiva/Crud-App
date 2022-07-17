//Import
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema
var inputFeilds = new Schema({
  name: String,
  email: String,
});

//Collection
var input = mongoose.model("Data", inputFeilds);

//Export
module.exports = input;
