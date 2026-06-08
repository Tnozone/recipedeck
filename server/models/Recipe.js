const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  ingredients: String,
  steps: String,
  username: String
});

module.exports = mongoose.model(
  "Recipe",
  recipeSchema
);