const express = require("express");
const mongoose = require("mongoose");
const { Router } = require("express");
const schema = require("../models/schema");
const { restart } = require("nodemon");
const route = Router();



var Signup = schema.signup;

route.post("/", async (req, res, next) => {
    const { name, email, mobile, password } = req.body;
    const existingUser = await Signup.findOne({ email, password });
    if (existingUser) {
        console.log("errorfind")
      return res.status(409).send({ error: "User already exists" });
    }
    const signup = new Signup({
      name,
      email,
      mobile,
      password
    });
    try {
      await signup.save();
      res.send({ message: "Signup successful", response: "ok" });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).send({ error: "An error occurred while signing up" });
    }
  });
  
module.exports = route;
