import express from "express";
import morgan from "morgan";
import mongoose from "mongoose"; // Importing mongoose
import dotenv from "dotenv"; // importing dotenv
import cors from "cors";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployes,
  getEmployeeById,
  updateEmployee,
} from "./controllers/employee.controller.js";
import { loginEmployee } from "./controllers/auth.controller.js";
import { authorizeToken, checkRole } from "./middleware/auth.middleware.js";

dotenv.config(); // Configuring .env file

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors()); // Cors Middleware

// Route to verify Token
app.get("/", authorizeToken, (req, res) => {
  res.status(200).json({ message: "Token Verified." });
});

// Employee ko Routes
app.post("/employee", authorizeToken, checkRole, createEmployee);
app.get("/employee", authorizeToken, checkRole, getAllEmployes);
app.get("/employee/:id", getEmployeeById);
app.put("/employee/:id", updateEmployee);
app.delete("/employee/:id", authorizeToken, deleteEmployee);

app.post("/auth", loginEmployee);

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

// Backend ---> Create a folder named "middleware"
// Then create a file "auth.middleware.js" inside middleware folder
