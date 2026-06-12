import express from "express";
const router = express.Router();

import User from "../models/User.js";
import Recipe from '../models/Recipe.js'


router.post("/register", async (req, res) => {
    const existingUser = await User.findOne({
        email: req.body.email
    })

    if (existingUser) {
        return res.status(400).json({
        message: "Email already registered."
        })
    }

    const user = new User(req.body);

    await user.save();

    res.json(user);
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

  if (user.password !== password) {
    return res.status(401).json({
      message: 'Invalid username/email or password'
    })
  }

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email
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

export default router;