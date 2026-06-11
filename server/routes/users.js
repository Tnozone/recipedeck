import express from "express";
const router = express.Router();

import User from "../models/User.js";

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

export default router;