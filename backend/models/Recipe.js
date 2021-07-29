const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
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
  }
});

module.exports = Book = mongoose.model('book', BookSchema);