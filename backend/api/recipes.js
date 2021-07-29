const express = require('express');
const router = express.Router();

// Load Book model
const Book = require('../../models/Recipe');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('recipes route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ nobooksfound: 'No recipes found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json({ norecipefound: 'No recipe found' }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  Book.create(req.body)
    .then(recipe => res.json({ msg: 'Recipe added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this recipe' }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(recipe=> res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, req.body)
    .then(recipe => res.json({ mgs: 'Recipe entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a recipe' }));
});

module.exports = router;