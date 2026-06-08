const express = require("express");
const router = express.Router();

const User = require("../models/User");

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

router.post("/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (!user) {
        return res.status(401).json({
        message: "Invalid credentials"
        });
    }

    res.json(user);
});

module.exports = router;