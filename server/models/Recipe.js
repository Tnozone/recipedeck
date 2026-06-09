import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  ingredients: String,
  steps: String,
  username: String
});

export default mongoose.model("Recipe", recipeSchema);
