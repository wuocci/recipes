const mongoose = require("mongoose");

const Recipe = mongoose.model(
  "Recipe",
    new mongoose.Schema({
      title: String,
      description: String,
      cooking_time: String,
      servings: String,
      ingredients: Array,
      instructions: Array,
      main_ingredient: String,
      main_category: String,
      meal_type: String,
      keywords: Array,
      images: Buffer,
      user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ]
    },
    { timestamps: true }
  ));
  module.exports = Recipe;
