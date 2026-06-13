import express from "express";
import mongoose from 'mongoose'

const router = express.Router();

import User from "../models/User.js";
import Recipe from '../models/Recipe.js'
import bcrypt from 'bcrypt'


router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({
        email: req.body.email
    })

    if (existingUser) {
        return res.status(400).json({
        message: "Email already registered."
        })
    }

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    )

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    await user.save();

    res.json(user);
  }

  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
});

router.post('/login', async (req, res) => {
  const { loginIdentifier, password } = req.body

  const user = await User.findOne({
    $or: [
      { username: loginIdentifier },
      { email: loginIdentifier }
    ]
  })

  if (!user) {
    return res.status(401).json({
      message: 'Invalid username/email or password'
    })
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  )

  if (!passwordMatch) {
    return res.status(401).json({
      message: 'Invalid username/email or password'
    })
  }

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    favorites: user.favorites || []
  })
})

router.delete('/:username', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      username: req.params.username
    })

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

     await Recipe.deleteMany({
      username: req.params.username
    })

    res.json({
      message: 'Account and recipes deleted'
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

router.post('/:username/favorites/:recipeId', async (req, res) => {
  try {

    const user = await User.findOne({ username: req.params.username })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const recipeIdStr = req.params.recipeId

    const recipeId = new mongoose.Types.ObjectId(recipeIdStr)

    if (!mongoose.Types.ObjectId.isValid(req.params.recipeId)) {
      return res.status(400).json({
        message: 'Invalid recipeId format',
        recipeId: req.params.recipeId
      })
    }

    // ensure array
    if (!Array.isArray(user.favorites)) {
      user.favorites = []
    }

    const index = user.favorites.findIndex(fav =>
      fav?.toString() === recipeId.toString()
    )

    if (index === -1) {
      user.favorites.push(recipeId)
    } else {
      user.favorites.splice(index, 1)
    }

    await user.save()

    res.json(user.favorites)
  }
  catch (err) {
    console.error(err)
    console.error(err.stack)

    res.status(500).json({
      message: err.message,
      name: err.name
    })
  }
})

router.get('/:username/favorites', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const recipes = await Recipe.find({
      _id: { $in: user.favorites }
    })

    res.json(recipes)
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router;