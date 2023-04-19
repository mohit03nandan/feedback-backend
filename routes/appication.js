const express = require("express");
const mongoose = require("mongoose");
const { Router } = require("express");
const schema = require("../models/schema");
const { restart } = require("nodemon");
const route = Router();

var applicationListing = schema.application


route.post("/", async (req, res, next) => {
    const { companyName, category, logo, link, Description } = req.body;
  
    const application = new applicationListing({
      companyName,
      category: category.split(",").map((cat) => cat.trim()), // split the comma-separated categories and trim whitespace from each category
      logo,
      link,
      Description,
    });
  
    try {
      await application.save();
      res.send({ message: "Application listing created successfully", response: "ok" });
    } catch (error) {
      console.error("Error creating application listing:", error);
      res.status(500).send({ error: "An error occurred while creating the application listing" });
    }
  });

  route.post('/sortUpvote', async (req, res) => {
    try {
      const sortupvote = await applicationListing.find().sort({ upvote: -1 });
      res.status(200).send(sortupvote);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving applications');
    }
  });

  route.post('/sortComment', async (req, res) => {
    try {
      
      const sortcomments = await applicationListing.find();
      const sortedData = sortcomments.sort((a, b) => b.comment.length - a.comment.length);
      res.status(200).send(sortedData);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving applications');
    }
  });
  

  
  route.post("/getApplication", async (req, res) => {
    try {
      const applications = await applicationListing.find();
      res.send(applications);
    } catch (error) {
      console.error("Error retrieving applications:", error);
      res.status(500).send({ error: "An error occurred while retrieving applications" });
    }
  });
  
  route.post("/getCategory", async (req, res) => {
    try {
      const categories = await applicationListing.distinct("category"); // get unique categories from database
      const uniqueCategories = categories.filter((category, index, self) => self.indexOf(category) === index); // filter out duplicate categories
      // console.log(uniqueCategories); // log the unique categories
      res.send(uniqueCategories)
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "An error occurred while retrieving category" });
    }
  });

  route.post("/:category", async (req, res) => {
   
    try {
      const { category } = req.params;
      const data = await applicationListing.find({ category: category });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error while fecthing category');
    }

  });

  route.post('/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    
    try {
      const application = await applicationListing.findById(id);
      application.comment.push(comment);
      await application.save();
      res.status(200).send(application);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding comment to application');
    }
  });

  route.post('/:id/upvote', async (req, res) => {
    const { id } = req.params;
  
    try {
      const application = await applicationListing.findById(id);
      application.upvote++;
      await application.save();
      res.status(200).send(application);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error upvoting application');
    }
  });
  

  
  route.post('/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
      const Editapplication = await applicationListing.findById(id);
      res.status(200).send(Editapplication);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding comment to application');
    }
  });


  route.post('/:id/update', async (req, res) => {
    const { id } = req.params;
    const { updates } = req.body;
  
    try {
      const updateapplication = await applicationListing.findById(id);
      if (!updateapplication) {
        return res.status(404).send('Application not found');
      }
      updateapplication.companyName = updates.companyName;
      updateapplication.category = updates.category;
      updateapplication.logo = updates.logo;
      updateapplication.link = updates.link;
      updateapplication.Description = updates.Description;
  
      await updateapplication.save();
  
      res.status(200).send('Application updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding and updating to application');
    }
  });
  

  
  
module.exports = route;
