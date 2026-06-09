import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./routes/users.js";
import recipeRoutes from "./routes/recipes.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});