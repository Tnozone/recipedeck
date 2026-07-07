import express from "express";
const router = express.Router();

import Recipe from "../models/Recipe.js";
import { authMiddleware } from '../middleware/auth.js'

// fetch all recipes
router.get("/", async (req, res) => {
    const recipes = await Recipe.find();

    res.json(recipes);
});

// saves new recipe, authenticated to save the usernameof the publisher
router.post("/", authMiddleware, async (req, res) => {
    const recipe = new Recipe({
      name: req.body.name,
      tags: req.body.tags,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      username: req.user.username
    })

    await recipe.save();

    res.status(201).json(recipe)
});

// fetches recipes by a specific user
router.get("/user/:username", async (req, res) => {
    const recipes = await Recipe.find({
        username: req.params.username
    });

    res.json(recipes);
});

// fetches a specific recipe
router.get("/:id", async (req, res) => {
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

// deletes a recipe
router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(
      req.params.id
    )

    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found'
      })
    }

    res.json({
      message: 'Recipe deleted'
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

export default router;