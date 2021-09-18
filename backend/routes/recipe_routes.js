module.exports = app => {
  const Recipes = require("../controllers/recipes_controller.js");

  var router = require("express").Router();

// Create a new Recipes
  router.post("/", Recipes.create);

  // Retrieve all Recipes
  router.get("/", Recipes.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id",Recipes.findOne);

  // Update a Tutorial with id
  router.put("/:id",Recipes.update);

  // Delete a Tutorial with id
  router.delete("/:id",Recipes.delete);

  app.use('/api/recipes', router);
};