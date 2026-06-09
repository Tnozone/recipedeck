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

export default router;