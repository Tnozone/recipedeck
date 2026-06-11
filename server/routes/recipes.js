import express from "express";
const router = express.Router();

import Recipe from "../models/Recipe.js";

router.get("/", async (req, res) => {
    const recipes = await Recipe.find();

    res.json(recipes);
});

router.post("/", async (req, res) => {
    const recipe = new Recipe(req.body);

    await recipe.save();

    res.status(201).json(recipe)
});

router.get("/user/:username", async (req, res) => {
    const recipes = await Recipe.find({
        username: req.params.username
    });

    res.json(recipes);
});

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    res.json(recipe)
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router;