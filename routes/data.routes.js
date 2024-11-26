module.exports = app => {
    const students_data = require("../controllers/data.controller.js");
  
    var router = require("express").Router();
  
    // Create a new StudentData
    router.post("/", students_data.create);
  
    // Retrieve all Tutorials
    router.get("/", students_data.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", students_data.findAllPublished);
  
    // Retrieve a single StudentData with id
    router.get("/:id", students_data.findOne);
  
    // // Update a StudentData with id
    // router.put("/:id", students_data.update);
  
    // // Delete a StudentData with id
    // router.delete("/:id", students_data.delete);
  
    // // Delete all Data
    // router.delete("/", students_data.deleteAll);
  
    app.use('/api/studentdata', router);
  };