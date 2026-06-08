const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");

router.get("/", async (req, res) => {
    const recipes = await Recipe.find();

    res.json(recipes);
});

router.post("/", async (req, res) => {
    const recipe = new Recipe(req.body);

    await recipe.save();

    res.json(recipe);
});

router.get("/user/:username", async (req, res) => {
    const recipes = await Recipe.find({
        username: req.params.username
    });

    res.json(recipes);
});

module.exports = router;