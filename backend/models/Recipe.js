const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  published_date: {
    type: Date
  },
  cooking_time: {
    type: String
  },
  servings: { 
    type: String
  },
  ingredients: {
    type: Array
  },
  instructions: {
    type: Array
  },
  main_ingredient: {
    type: String,
    required: true
  },
  main_category: {
    type: String,
    required: true
  },
  meal_type: {
    type: String,
    required: true
  },
  keywords: {
    type: Array
  },
  images: {
    type: Buffer
  },
},{ collection : 'recipes' });

module.exports = mongoose.model('recipe', recipeSchema);