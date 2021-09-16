let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
const Recipe = require('../models/Recipe');

// @route GET api/recipes/
// @description Get all recipes
// @access Public
router.get('/', (req, res) => {
	db.collection('recipe').find({}).toArray()
	.then((recipes) => {
    res.json(recipes);
    });
});

// @route GET api/recipes/:id
// @description Get single recipe by id
// @access Public
router.get('/:id', (req, res) => {
  db.collection('recipe').findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json({ norecipefound: 'No recipe found' }));
});


// @route GET api/recipe
// @description add/save recipe
// @access Public
router.post('/', (req, res) => {
  var myRecipe = new Recipe(req.body)
  db.collection('recipe').save(myRecipe, (err, result) => {
    if (err) return console.log(err)
    })
    .then(recipe => res.json({ msg: 'Recipe added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this recipe' }));
});

// @route GET api/recipe/:id
// @description Update recipe
// @access Public
router.put('/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body)
    .then(recipe=> res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/recipe/:id
// @description Delete recipeby id
// @access Public
router.delete('/:id', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, req.body)
    .then(recipe => res.json({ mgs: 'Recipe entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a recipe' }));
});

module.exports = router;