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
      images: req.body.images
    });
  
    // Save Tutorial in the database
    recipe
      .save(recipe)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };


// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    Recipe.find({})
      .then(data => {
        res.json(data);
        console.log(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving recipes."
        });
      });
  };
// Find a single Recipe with an id
exports.findOne = (req, res) => {
    const id = req.params.id; 
    Recipe.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Recipe with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Recipe with id=" + id });
      });
  };


// Update recipe
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  
};

