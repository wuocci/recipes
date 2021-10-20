module.exports = (app) => {
  const Recipes = require("../controllers/recipes_controller.js");

  var router = require("express").Router();

  // Create a new Recipes
  router.post("/", Recipes.create);

  // Retrieve all Recipes
  router.get("/", Recipes.findAll);

  // Retrieve a single Recipe with id
  router.get("/recipe=/:id", Recipes.findOne);

  // Retrieve all Recipes by user
  router.get("/:userId", Recipes.findByUser);

  // Update a Recipe with id
  router.put("/:id", Recipes.update);

  // Delete a Recipe with id
  router.delete("/:id", Recipes.delete);

  app.use("/api/recipes", router);
};
