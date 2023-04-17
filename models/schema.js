const mongoose = require("mongoose");

const Signup = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobile:{type:Number},
  password:{type:Number}
});

const signup = mongoose.model("signup", Signup);

var my_schemas = {
    signup: signup,
};

module.exports = my_schemas;
