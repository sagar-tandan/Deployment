import employeeModel from "../models/employee.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginEmployee(req, res) {
  try {
    // 1. Extract email and password
    const { email, password } = req.body;

    // 2. Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // 3. Check if email is present in database
    const user = await employeeModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    // 4. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 5. Create/sign  a jwt token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        userType: user.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 6. Send token to frontend as a resposne
    res.status(200).json({
      message: "Login successfull",
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.log("Error wile login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
