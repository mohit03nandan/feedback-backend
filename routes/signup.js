const express = require("express");
const mongoose = require("mongoose");
const { Router } = require("express");
const schema = require("../models/schema");
const { restart } = require("nodemon");
const route = Router();



var Signup = schema.signup;

route.post("/", async (req, res, next) => {

    const signup = new Signup({

             
      });
      signup.save();
      res.send({message:"folder created successfully",Response:"ok"})
     res.send("signup")

});





module.exports = route;
