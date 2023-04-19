const mongoose = require("mongoose");

const Signup = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobile:{type:Number},
  password:{type:String}
});


const applications = new mongoose.Schema({
  companyName: { type: String },
  category: { type: [String] },
  logo:{type:String},
  link:{type:String},
  Description:{type:String},
  upvote:{type:Number,default: 0 },
  comment:{type:[String]}
});




const signup = mongoose.model("signup", Signup);
const application = mongoose.model("application",applications )

var my_schemas = {
  signup: signup,
  application:application,
};

module.exports = my_schemas;
