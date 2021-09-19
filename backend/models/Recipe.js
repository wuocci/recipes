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

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Recipe = mongoose.model("recipe", schema);
  return Recipe;
};