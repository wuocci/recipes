const db = require("../models");
const Recipe = db.recipe;

// Create new recipe
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Recipe
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    cooking_time: req.body.cooking_time,
    servings: req.body.servings,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    main_ingredient: req.body.main_ingredient,
    main_category: req.body.main_category,
    meal_type: req.body.meal_type,
    keywords: req.body.keywords,
    images: req.body.images,
    user: req.body.user,
  });

  // Save Tutorial in the database
  recipe
    .save(recipe)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
  Recipe.find({})
    .limit(20)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipes.",
      });
    });
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Recipe with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Recipe with id=" + id });
    });
};

exports.findByUser = (req, res) => {
  const userId = req.params.userId;
  Recipe.find({ "user.id": userId })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Recipes with user " + userId });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Recipes with id=" + userId });
    });
};

// Update recipe
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found!`,
        });
      } else res.send({ message: "Recipe was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Recipe with id=" + id,
      });
    });
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  const recipeId = req.params.id;

  Recipe.deleteOne({ _id: recipeId })
    .then((data) => {
      if (!data) res.status(404).send({ message: "Error deleting recipe!" });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Recipe" });
    });
};
