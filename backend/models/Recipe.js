module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      author: String,
      description: String,
      cooking_time: String,
      servings: String,
      ingredients: String,
      instructions: String,
      main_ingredient: String,
      main_category: String,
      meal_type: String,
      keywords: Array,
      images: Buffer
    },
    { timestamps: true }
  );
  const Recipe = mongoose.model("recipe", schema);
  return Recipe;
};