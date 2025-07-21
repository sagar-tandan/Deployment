import express from "express";
import morgan from "morgan";
import mongoose from "mongoose"; // Importing mongoose

import dotenv from "dotenv"; // importing dotenv
dotenv.config(); // Configuring .env file

const app = express();
const PORT = process.env.PORT;

// For logging
app.use(morgan("dev"));

// Creating Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Nodejs!" });
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Database Connection Done.");
    app.listen(PORT, () => {
      console.log("Server is running at port: ", PORT);
    });
  })
  .catch((err) => {
    console.log("❌ Datbase connection Failed.", err);
  });
